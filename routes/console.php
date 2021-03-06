<?php

use Illuminate\Support\Facades\Schema;

Artisan::command('package-skeleton:install', function () {
    if (!Schema::hasTable('sample_skeleton')) {
        Schema::create('sample_skeleton', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->increments('id');
            $table->string('email');
            $table->timestamps();
        });
    }
    Artisan::call('vendor:publish', [
        '--tag' => 'package-skeleton',
        '--force' => true
    ]);

    $this->info('Package Skeleton has been installed');
})->describe('Installs the required js files and table in DB');
