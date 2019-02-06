<?php

namespace App\Http\Controllers;

use App\Employee;
use App\Menu;
use App\MenuGroup;

use App\Http\Controllers\Shared\FunctionController;

use Illuminate\Http\Request;
use Auth;
use DB;
use File;
use Excel;
use Response;
use Validator;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MenuController extends Controller {
    
    public function __construct() {
        $this->middleware('jwt.auth');
        $this->thisEmployee = new Employee;
        $this->thisFunction = new FunctionController;
    }

    public function getMenu() {
        $menu_group = DB::select("
            SELECT webpage_group_id, webpage_group_code, webpage_group_name, seq_no
            FROM webpage_group
            WHERE is_active = 1
            ORDER BY seq_no
        ");

        foreach($menu_group as $mgk => $mgv) {
            $menu = DB::select("
                SELECT *
                FROM webpage 
                WHERE webpage_group_id = {$mgv->webpage_group_id}
                ORDER BY seq_no
            ");
            $menu_group[$mgk]->menu = $menu;
        }

        $is_all = $this->thisEmployee->isAll();
        return response()->json(['menu_group' => $menu_group, 'is_all' => $is_all[0]->is_all]);
    }

    public function CU(Request $request) {
        $errors = [];
        $errors_validator = [];

		$validator = Validator::make([
			'MenuName' => $request->menuName
		], [
			'MenuName' => 'required|max:255'
		]);

		if($validator->fails()) {
			$errors_validator[] = $validator->errors();
        }
        
        if(!empty($errors_validator)) {
            return response()->json(['status' => 400, 'data' => $errors_validator]);
        }

        if(empty($request->menuId)) {
            $menu = new Menu();
            $menu->webpage_group_id = $request->groupId;
            $menu->webpage_name = $request->menuName;
            $menu->webpage_url = $this->thisFunction->strtolower_ReplaceSpace($request->menuName);
            $menu->is_active = 1;
            $menu->created_by = Auth::id();
            $menu->updated_by = Auth::id();
        } else {
            $menu = Menu::find($request->menuId);
            $menu->webpage_group_id = $request->groupId;
            $menu->webpage_name = $request->menuName;
            $menu->webpage_url = $this->thisFunction->strtolower_ReplaceSpace($request->menuName);
            $menu->is_active = 1;
            $menu->updated_by = Auth::id();
        }

        try {
            $menu->save();
        } catch(exception $e) {
            $errors[] = substr($e,0,254);
        }

        if(empty($errors)) {
            return response()->json(['status' => 200, 'data' => []]);
        } else {
            return response()->json(['status' => 400, 'data' => $errors]);
        }
    }

    public function sortMenu(Request $request) {
        foreach($request->all() as $keyG => $valueG) {
            $g = MenuGroup::find($valueG['webpage_group_id']);
            $g->seq_no = $keyG;
            $g->created_by = Auth::id();
            $g->updated_by = Auth::id();
            $g->save();
            foreach($valueG['menu'] as $keyG2 => $valueG2) {
                $m = Menu::find($valueG2['webpage_id']);
                $m->seq_no = $keyG2;
                $m->created_by = Auth::id();
                $m->updated_by = Auth::id();
                $m->save();
            }
        }
        return response()->json(['status' => 200]);
    }

    public function destroy($webpage_id) {
		try {
			$item = Menu::findOrFail($webpage_id);
		} catch (ModelNotFoundException $e) {
			return response()->json(['status' => 404, 'data' => 'Menu not found.']);
		}

		try {
			$item->delete();
		} catch (Exception $e) {
			if ($e->errorInfo[1] == 1451) {
				return response()->json(['status' => 400, 'data' => 'Cannot delete because this QuestionaireDataHeader is in use.']);
			} else {
				return response()->json($e->errorInfo);
			}
		}

		return response()->json(['status' => 200]);

	}
}