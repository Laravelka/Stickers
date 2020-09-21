<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<!-- Meta tags -->
		<meta charset="utf-8">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>{{ config('app.name', 'Laravel') }}</title>

		<!-- Fonts -->
		<link rel="dns-prefetch" href="//fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
		<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
		
		<!-- Styles -->
		<link rel="stylesheet" href="{{ mix('css/app.css') }}" />
	</head>
	<body>
		<div id="app"></div>

		<!-- Scripts -->
		<script type="text/javascript">
			var user = JSON.parse('<?=( $userData !== false ? json_encode($userData, JSON_UNESCAPED_UNICODE) : 'false' )?>');
			var isError = {{ isset($error) ? 'true' : 'false' }};
			var message = <?=( isset($message) ? "'".$message."'" : 'false' )?>;

			window.Laravel = {
				user: user,
				error: isError,
				appId: {{ App\Config::getData('vk_appId') }},
				message: message,
				baseUrl: "{{ config('app.url') }}"
			};
		</script>
		<script src="{{ mix('js/app.js') }}"></script>
	</body>
</html>