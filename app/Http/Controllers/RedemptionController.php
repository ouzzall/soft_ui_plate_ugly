<?php

namespace App\Http\Controllers;

use App\Models\RedemptionPlan;
use Illuminate\Support\Str;
use App\Models\RedemptionReward;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Order;
use App\Models\UserLoyalty;
use App\Models\RewardRecieved;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RedemptionController extends Controller
{
    public function add_plan(Request $request)
    {
        // return $request;

        $validator = Validator::make($request->all(),[
        'title'=>'required',
        'days' => 'required',
        'orders' => 'required',
        'min_orders_amount' => 'required',
        'percentage' => 'required',
        'star' => 'required',
        ], [
        ]);

        if ($validator->fails())
        {
            $str['status']=false;
            $error=$validator->errors()->toArray();
            foreach($error as $x_value){
                $err[]=$x_value[0];
            }
            $str['message'] =$err['0'];
            // $str['data'] = $validator->errors()->toArray();
            return $str;
        }
        else
        {

            if($request->id == "false")
            {
                $vbl = new RedemptionPlan;
                $vbl->title = $request->title;
                $vbl->days = $request->days;
                $vbl->orders = $request->orders;
                $vbl->min_orders_amount = $request->min_orders_amount;
                $vbl->percentage = $request->percentage;
                $vbl->star = $request->star;
                $vbl->save();

                $str['status']=true;
                $str['message']="New Plan Added";
                $str['data']=$vbl;
                return $str;
            }
            else
            {
                $vbl = RedemptionPlan::find($request->id);
                $vbl->title = $request->title;
                $vbl->days = $request->days;
                $vbl->orders = $request->orders;
                $vbl->min_orders_amount = $request->min_orders_amount;
                $vbl->percentage = $request->percentage;
                $vbl->star = $request->star;
                $vbl->update();

                $str['status']=true;
                $str['message']="Plan Updated";
                $str['data']=$vbl;
                return $str;
            }
        }
    }

    public function get_plans(Request $request)
    {
        // return $request;

        // $vbl = RedemptionPlan::all();
        // return $vbl;

        $user = Auth::user();
        $price_rules = RedemptionPlan::query();
        $price_rules->when($user->role->type == 'customer', function ($q) use ($user) {
            $q->whereHas('user', function ($q) use ($user) {
                $q->where('id', $user->id);
            });
        });
        $price_rules->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $price_rules->when($request->get('search'), function ($q) use ($request) {
            try {
                $input = Carbon::createFromFormat('d/m/Y', $request->search)->format('Y-m-d');
            } catch (InvalidFormatException $ex) {
                $input = $request->search;
            }
            $q->where(function($q) use ($input) {
                $q->whereHas('user', function($q) use ($input) {
                    $q->where('name', 'LIKE', '%' . $input . '%')
                    ->orWhere('email', 'LIKE', '%' . $input . '%');
                })
                ->orWhere('discount_code', 'LIKE', '%'. $input .'%')
                ->orWhereDate('starts_at', 'LIKE', '%'. $input .'%')
                ->orWhereDate('ends_at', 'LIKE', '%'. $input .'%');
            });
        });
        $count = $price_rules->count();
        $price_rules->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $price_rules = $price_rules->orderBy('id', 'DESC')->get();
        $price_rules = $price_rules->map(function ($value) {
            $value['starts_at'] = Carbon::parse($value['starts_at'])->format('d/m/Y');
            $value['ends_at'] = Carbon::parse($value['ends_at'])->format('d/m/Y');
            return $value;
        });
        $data = [
            'data' => $price_rules,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Discount Rules retrieved sucessfully!',
            'data' => $data,
        ]);
    }

    public function delete_plan(Request $request)
    {
        // return $request;

        $vbl = RedemptionPlan::find($request->id);
        $vbl->delete();

        $str['status']=true;
        $str['message']="PLAN DELETED";
        return $str;
    }

    public function reward_manager_init(Request $request)
    {
        // return $request;

        $vbl1 = RedemptionPlan::all();
        $vbl2 = RedemptionReward::all();

        $vbl = getShop();
        // return $vbl;
        $response = $vbl->api()->rest('get', '/admin/api/2022-04/products.json');

        // return $response['body']['products'];

        $str['status']=true;
        $str['message']="ALL PLANS AND REWARDS SHOWN";
        $str['data']=array($vbl1,$vbl2,$response['body']['products']);
        return $str;
    }

    public function add_reward(Request $request)
    {
        // return $request;

        $validator = Validator::make($request->all(),[
        'product_title'=>'required',
        'reward_title' => 'required',
        'reward_point' => 'required',
        'prev_reward_id' => 'required|numeric',
        'plan_id' => 'required',
        'product_id' => 'required',
        'variant_id' => 'required',
        'image_src' => 'required',
        ], [
        ]);

        if ($validator->fails())
        {
            $str['status']=false;
            $error=$validator->errors()->toArray();
            foreach($error as $x_value){
                $err[]=$x_value[0];
            }
            $str['message'] =$err['0'];
            // $str['data'] = $validator->errors()->toArray();
            return $str;
        }
        else
        {
            if($request->id == "false")
            {
                $vbl = new RedemptionReward;
                $vbl->product_title = $request->product_title;
                $vbl->reward_title = $request->reward_title;
                $vbl->reward_point = $request->reward_point;
                $vbl->prev_reward_id = $request->prev_reward_id;
                $vbl->plan_id = $request->plan_id;
                $vbl->product_id = $request->product_id;
                $vbl->variant_id = $request->variant_id;
                $vbl->image_src = $request->image_src;
                $vbl->save();

                $str['status']=true;
                $str['message']="New Reward Added";
                $str['data']=$vbl;
                return $str;
            }
            else
            {
                $vbl = RedemptionReward::find($request->id);
                $vbl->product_title = $request->product_title;
                $vbl->reward_title = $request->reward_title;
                $vbl->reward_point = $request->reward_point;
                $vbl->prev_reward_id = $request->prev_reward_id;
                $vbl->plan_id = $request->plan_id;
                $vbl->product_id = $request->product_id;
                $vbl->variant_id = $request->variant_id;
                $vbl->image_src = $request->image_src;
                $vbl->save();

                $str['status']=true;
                $str['message']="Reward Updated";
                $str['data']=$vbl;
                return $str;
            }
        }
    }

    public function get_rewards(Request $request)
    {
        $user = Auth::user();

        $price_rules = "";

        // $price_rules = RedemptionReward::query();
        if($request->selected_plan == "")
        {
            $price_rules = RedemptionReward::
            join('redemption_plans','redemption_plans.id','=','redemption_rewards.plan_id')
            ->leftJoin('redemption_rewards as new_table','new_table.id','=','redemption_rewards.prev_reward_id')
            ->select('redemption_rewards.*','redemption_plans.star','redemption_plans.title','new_table.reward_title as dependency_title');
        }
        else
        {
            $price_rules = RedemptionReward::
            where('redemption_rewards.plan_id','=',$request->selected_plan)
            ->join('redemption_plans','redemption_plans.id','=','redemption_rewards.plan_id')
            ->leftJoin('redemption_rewards as new_table','new_table.id','=','redemption_rewards.prev_reward_id')
            ->select('redemption_rewards.*','redemption_plans.star','redemption_plans.title','new_table.reward_title as dependency_title');
        }

        // ->select('redemption_rewards.*','redemption_plans.star','redemption_plans.title');
        // ->get();





        // return $price_rules;

        $price_rules->when($user->role->type == 'customer', function ($q) use ($user) {
            $q->whereHas('user', function ($q) use ($user) {
                $q->where('id', $user->id);
            });
        });
        $price_rules->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $price_rules->when($request->get('search'), function ($q) use ($request) {
            try {
                $input = Carbon::createFromFormat('d/m/Y', $request->search)->format('Y-m-d');
            } catch (InvalidFormatException $ex) {
                $input = $request->search;
            }
            $q->where(function($q) use ($input) {
                $q->whereHas('user', function($q) use ($input) {
                    $q->where('name', 'LIKE', '%' . $input . '%')
                    ->orWhere('email', 'LIKE', '%' . $input . '%');
                })
                ->orWhere('discount_code', 'LIKE', '%'. $input .'%')
                ->orWhereDate('starts_at', 'LIKE', '%'. $input .'%')
                ->orWhereDate('ends_at', 'LIKE', '%'. $input .'%');
            });
        });
        $count = $price_rules->count();
        $price_rules->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $price_rules = $price_rules->orderBy('id', 'DESC')->get();
        $price_rules = $price_rules->map(function ($value) {
            $value['starts_at'] = Carbon::parse($value['starts_at'])->format('d/m/Y');
            $value['ends_at'] = Carbon::parse($value['ends_at'])->format('d/m/Y');
            return $value;
        });
        $data = [
            'data' => $price_rules,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Discount Rules retrieved sucessfully!',
            'data' => $data,
        ]);
    }

    public function delete_reward(Request $request)
    {
        $vbl = RedemptionReward::find($request->id);
        $vbl->delete();

        $str['status']=true;
        $str['message']="REWARD DELETED";
        return $str;
    }

    public function get_my_plan(Request $request)
    {
        $vbl1 = RedemptionPlan::orderBy('orders','asc')->get();
        $vbl2 = Auth::user();
        $vbl3 = Order::where('user_id',$vbl2->id)
        // ->where('amount' , '>' , $next_plan->min_orders_amount)
        ->get();
        // return $vbl1;

        $next_plan = "";
        $current_plan = "";

        if(count($vbl1) != 0)
        {
            for ($i = 0; $i < count($vbl1); $i++) {
                if (count($vbl3) >= $vbl1[$i]->orders) {
                    $current_plan = $vbl1[$i];
                    if($i + 1 == count($vbl1))
                        $next_plan = false;
                    else
                        $next_plan = $vbl1[$i + 1];
                    break;
                }
            }
            if ($next_plan) {
                // echo $current_plan;
                // echo $next_plan;
            } else {
                // console.log("OUTSIDE");
                $next_plan = $vbl1[0];
                // echo $next_plan;
            }

            $vbl3 = Order::where('user_id',$vbl2->id)
            ->where('amount' , '>=' , $next_plan->min_orders_amount)
            ->get();
        }

        return array ($current_plan,$next_plan,$vbl3);

        $vbl4 = RedemptionReward::orderBy('prev_reward_id','asc')->get();
        $vbl7 = RewardRecieved::all();

        $final_array = array();
        foreach ($vbl4 as $value) {
            $inside = RewardRecieved::where('reward_id',$value->id)->where('user_id',$vbl2->id)->first();
            if(empty($inside))
            {
                $value->reward_status = "NOT_CASHED";
                array_push($final_array,$value);
            }
            else
            {
                $value->reward_status = "CASHED";
                array_push($final_array,$value);
            }
        }
        $vbl4 = $final_array;

        // $vbl4 = DB::table('redemption_rewards')
        // ->leftJoin('reward_recieveds','reward_recieveds.reward_id','=','redemption_rewards.id')
        // ->where('reward_recieveds.user_id','=',$vbl2->id)
        // ->select('redemption_rewards.*','reward_recieveds.reward_code','reward_recieveds.status')
        // ->get();
        // return $vbl4;

        $vbl5 = UserLoyalty::where('user_id',$vbl2->id)->first();
        $vbl6 = getShop();

        return response()->json([
            'success' => true,
            'message' => 'Plans retrieved successfully',
            'data' => array($vbl1,$vbl2,$vbl3,$vbl4,$vbl5,$vbl6),
        ]);
    }

    public function get_plan_rewards(Request $request)
    {
        // return $request;

        $vbl4 = RedemptionReward::where('plan_id',$request->id)->get();

        $str['status']=true;
        $str['message']="SPECIFIC REWARDS SHOWN";
        $str['data']=$vbl4;
        return $str;
    }

    public function make_discount_code(Request $request)
    {
        // return $request;

        $current_user = Auth::user();

        if($request->all_rewards == true)
        {
            $code = Str::random(8);
            $variant_ids = explode(",",$request->variant_ids);
            $ids = explode(",",$request->ids);
            for ($i=0; $i < count($ids); $i++) {
                $vbl = new RewardRecieved;
                $vbl->reward_id = $ids[$i];
                $vbl->user_id = $current_user->id;
                $vbl->reward_code = $code;
                $vbl->status = "true";
                $vbl->save();
            }

            $createPriceRule = getShop()->api()->rest('POST', '/admin/api/2021-10/price_rules.json', [
                'price_rule' => [
                    'title' => $code,
                    'target_type' => "line_item",
                    'target_selection' => "entitled",
                    'allocation_method' => 'across',
                    'usage_limit' => 1,
                    'once_per_customer' => true,
                    "value_type" => "percentage",
                    "value" => "-100.0",
                    'customer_selection' => 'all',
                    'entitled_variant_ids' => explode(",",$request->variant_ids),
                    'starts_at' => Carbon::now(),
                    'ends_at' => Carbon::now()->addDays(30),
                ]
            ]);

            // $createPriceRule = getShop()->api()->rest('GET', '/admin/api/2022-04/price_rules.json', [
            // $createPriceRule = getShop()->api()->rest('delete', '/admin/api/2022-04/price_rules/975343091765.json', [
            // ]);

            // return $createPriceRule;

            $priceRule = $createPriceRule['body']['price_rule'];
            $discountCode = getShop()->api()->rest('POST', '/admin/api/2022-01/price_rules/' . $priceRule['id'] . '/discount_codes.json', [
                'discount_code' => [
                    'code' => $code,
                ]
            ]);

            $str['status'] = true;
            $str['message'] = "DISCOUNT CODE GENERATED IN DISCOUNTS";
            $str['data'] = $code;
            return $str;
        }
        else if($request->one_reward == true)
        {
            $code = Str::random(8);
            // $variant_id = $request->variant_id;

            $vbl10 = RedemptionReward::find($request->id);

            $vbl20 = UserLoyalty::where('user_id',$current_user->id)->first();
            $vbl20->loyalty_earned = $vbl20->loyalty_earned - $vbl10->reward_point;
            $vbl20->save();

            $vbl = new RewardRecieved;
            $vbl->reward_id = $request->id;
            $vbl->user_id = $current_user->id;
            $vbl->reward_code = $code;
            $vbl->status = "true";
            $vbl->save();

            $createPriceRule = getShop()->api()->rest('POST', '/admin/api/2021-10/price_rules.json', [
                'price_rule' => [
                    'title' => $code,
                    'target_type' => "line_item",
                    'target_selection' => "entitled",
                    'allocation_method' => 'across',
                    'usage_limit' => 1,
                    'once_per_customer' => true,
                    "value_type" => "percentage",
                    "value" => "-100.0",
                    'customer_selection' => 'all',
                    'entitled_variant_ids' => [$request->variant_id],
                    'starts_at' => Carbon::now(),
                    'ends_at' => Carbon::now()->addDays(30),
                ]
            ]);

            // $createPriceRule = getShop()->api()->rest('GET', '/admin/api/2022-04/price_rules.json', [
            // $createPriceRule = getShop()->api()->rest('delete', '/admin/api/2022-04/price_rules/975343091765.json', [
            // ]);

            // return $createPriceRule;

            $priceRule = $createPriceRule['body']['price_rule'];
            $discountCode = getShop()->api()->rest('POST', '/admin/api/2022-01/price_rules/' . $priceRule['id'] . '/discount_codes.json', [
                'discount_code' => [
                    'code' => $code,
                ]
            ]);

            $str['status'] = true;
            $str['message'] = "DISCOUNT CODE GENERATED IN DISCOUNTS";
            $str['data'] = $code;
            return $str;
        }
    }
}
