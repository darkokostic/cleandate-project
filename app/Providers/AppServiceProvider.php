<?php

namespace App\Providers;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('custom', function ($status,$message,$entity) {
            return Response::json([
                'status'  => $status,
                'message' => $message,
                'entity' => $entity,
            ], $status);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
