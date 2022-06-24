<?php

namespace ProcessMaker\Package\PackageSkeleton\Models;

use Illuminate\Database\Eloquent\Model;
use ProcessMaker\Models\Media;

class Sample extends Model
{
    protected $table = 'sample_skeleton';

    protected $fillable = [
        'id', 'email'
    ];

    public function image()
    {
        return $this->morphOne(Media::class, "mediable");
    }
}
