<?php

namespace App\Http\Resources;

use App\Models\Collection;
use App\Models\Product;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $collections = $this->products()->where('type', 'collection')->get();
        $collections = $collections->map(function($collection){
            $collection['label'] = Collection::firstWhere('collection_id', $collection['product_id'])->title;
            return $collection;
        });
        $products = $this->products()->where('type', 'product')->get();
        $products = $products->map(function($product){
            $product['label'] = Product::firstWhere('product_id', $product['product_id'])->title;
            return $product;
        });
        return [
            'id' => $this->id,
            'campaign_name' => $this->campaign_name,
            'loyalty_points' => $this->loyalty_points,
            'collections' => $collections,
            'products' => $products,
        ];
    }
}
