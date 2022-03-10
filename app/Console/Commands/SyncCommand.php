<?php

namespace App\Console\Commands;

use App\Models\Collection;
use App\Models\Product;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SyncCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Used to sync products and collection with the Shopify';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $perPage = 250;
        $productCount = getShop()->api()->rest('GET', '/admin/api/2022-01/products/count.json')['body']['count'];

        $iterations = ceil($productCount / $perPage);

        $next = null;

        DB::beginTransaction();
        try {
            for ($i = 0; $i < $iterations; $i++) {
                $response = getShop()->api()->rest('GET', '/admin/api/2022-01/products.json', [
                    'limit' => $perPage,
                    'page_info' => $next
                ]);
                foreach($response['body']['products'] as $product) {
                    Product::updateOrCreate([
                        'product_id' => $product->id,
                    ], [
                        'title' => $product->title,
                    ]);
                }
                $link = $response['link'];
                $next = $link->next;
            }
            $collections = getShop()->api()->rest('GET', '/admin/api/2022-01/collects.json')['body']['collects'];

            foreach ($collections as $collection) {
                $collection = getShop()->api()->rest('GET', '/admin/api/2022-01/collections/' . $collection->collection_id . '.json')['body']['collection'];
                Collection::updateOrCreate([
                    'collection_id' => $collection->id,
                ], [
                    'title' => $collection->title,
                ]);
            }
            DB::commit();
            Log::channel('stderr')->info('Syncing of data done');
            Log::info('Syncing of data done');
        } catch(Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }
    }
}
