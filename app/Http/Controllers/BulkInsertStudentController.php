<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BulkInsertStudentController extends Controller
{
    public function insert(Request $request)
    {
        $prs = $request->file('prs');
        
        $handle = fopen($prs,'r');
        if($handle !== false){
            $headers = fgetcsv($handle, 0, ',');
            foreach($headers as $h){
                $column[] = $h;
            }
            $save = [];
            while (($data = fgetcsv($handle, 0, ',')) !== false) {
                for($i=0;$i<count($column);$i++){
                    $save[$column[$i]] = $data[$i];
                }
            }
        }
        dd($save);
    }
}
