<?php

namespace App\Http\Controllers;

use App\Models\ShippingRule;
use Illuminate\Http\Request;

class RulesController extends Controller
{
    public function getOrderRules(Request $request)
    {
        $rules = ShippingRule::where('shipping_rule_type', 1);
        $rules->when($request->get('search'), function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('id', 'LIKE', '% ' . $request->search . ' %')
                    ->orWhere('order_amount', 'LIKE', '% ' . $request->search . ' %')
                    ->orWhere('shipping_amount', 'LIKE', '% ' . $request->search . ' %')
                    ->orWhere('discount_type', 'LIKE', '% ' . $request->search . ' %');
            });
        });
        $count = $rules->count();
        $rules->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $rules = $rules->orderBy('id', 'DESC')->get();
        $data = [
            'data' => $rules,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully!',
            'data' => $data
        ]);
    }

    public function saveOrderRule(Request $request)
    {
        $rule = ShippingRule::create([
            'order_amount' => $request->order_amount,
            'shipping_amount' => $request->shipping_amount,
            'discount_type' => $request->discount_type,
            'shipping_rule_type' => 1,
            'is_active' => 1
        ]);
        if(!$rule) {
            return response()->json([
                'success' => false,
                'message' => 'An error occured while creating the rule!',
                'data' => $rule
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Rule created successfully!',
            'data' => $rule
        ]);
    }
    public function updateOrderRule(Request $request, $id)
    {
        $rule = ShippingRule::find($id);
        if(!$rule) {
            return response()->json([
                'success' => false,
                'message' => 'Rule not found!',
                'data' => $rule
            ]);
        }
        $rule->update([
            'order_amount' => $request->order_amount,
            'shipping_amount' => $request->shipping_amount,
            'discount_type' => $request->discount_type,
            'shipping_rule_type' => 1,
            'is_active' => 1
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Rule updated successfully!',
            'data' => $rule
        ]);
    }
}
