<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('agents', 'phone_number')) {
            Schema::table('agents', function (Blueprint $table) {
                $table->dropColumn('phone_number');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('agents', 'phone_number')) {
            Schema::table('agents', function (Blueprint $table) {
                $table->string('phone_number')->nullable();
            });
        }
    }
};
