<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Carbon\Exceptions\InvalidFormatException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
    }
    public function sync()
    {

    }
}
