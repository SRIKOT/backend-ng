<?php

namespace App;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
	 
	const CREATED_AT = 'created_dttm';
	const UPDATED_AT = 'updated_dttm';	 
    protected $table = 'employee';
	protected $primaryKey = 'emp_code';
	public $incrementing = false;
	//public $timestamps = false;
	protected $guarded = array();
	//protected $hidden = ['created_by', 'updated_by', 'created_dttm', 'updated_dttm'];

	public function isAll() {
		$items = DB::select("
			SELECT count(al.is_all_employee) is_all
			FROM employee e
			INNER JOIN appraisal_level al ON al.level_id = e.level_id
			WHERE emp_code = '".Auth::id()."'
		");
		return $items;
	}
}