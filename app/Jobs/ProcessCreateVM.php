<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Modules\API\Proxmox\PVE as PVE;

class ProcessCreateVM implements ShouldQueue
{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $os;
	protected $plan;
	protected $node;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct(array $args)
	{
		$this->os = $args[0];
		$this->plan = $args[1];
		$this->node = $args[2];
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		PVE::createvm($this->os, $this->plan, $this->node);
	}
}
