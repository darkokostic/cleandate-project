<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFooter extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'mail' => 'required',
            'ios' => 'required',
            'android' => 'required',
            'facebook' => 'required',
            'twitter' => 'required',
            'youtube' => 'required',
            'google' => 'required',
            'tumbler' => 'required',
            'content' => 'required',
        ];
    }
    public function response( array $errors ) {
        return  response()->custom(400, $errors, null);
    }
}
