<?php

namespace App\Http\Resources;

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
        $products = $this->products()->where('type', 'product')->get();
        return [
            'id' => $this->id,
            'compaign_name' => $this->compaign_name,
            'loyalty' => $this->loyalty,
            'collections' => $collections,
            'products' => $products,
        ];
    }
}
