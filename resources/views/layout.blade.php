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
				message: message,
				baseUrl: 'https://a622a99851c3.ngrok.io'
			};

			// https://ef1b2ecb72b1.ngrok.io/?vk_access_token_settings=docs&vk_app_id=7080403&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=1&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=310122979&sign=7iPaQzozHdexmOAU6OBVOCzowD-4QeTdymoMC_gTGUA
		</script>
		<script src="{{ mix('js/app.js') }}"></script>
	</body>
</html>