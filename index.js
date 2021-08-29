$(document).ready(function () {
	$('#data').mask('00/00/0000');
	$('#cep').mask('00000-000');
	$('#fixo').mask('(00) 0000-0000');
	$('#cel').mask('(00) 00000-0000');
	$('#cpf').mask('000.000.000-00', {reverse: true});
	$('#identidade').mask('00.000.000-0', {reverse: true});

	$('#cep').on('blur', function () {

		let cep = $(this).val();
		let url = "https://viacep.com.br/ws/" + cep + "/json/";

		$.get(url, function (response) {
			if (!('erro' in response)) {
				$('#rua').val(response.logradouro);
				$('#cidade').val(response.localidade);
				$('#bairro').val(response.bairro);
				$('#estado').val(response.uf).change();
			}
		})
	})


	$('#form').on('submit', function (e) {
		e.preventDefault();

		let data = $(this).serialize();
		let alert = $('.alert');

		$.post("/cadastro", data)
			.done(function (response) {
				alert.removeClass('alert-danger').removeClass('alert-success')
				if (response.status === 'error'){
					alert.addClass('alert-danger');
				} else if(response.status === 'success') {
					alert.addClass('alert-success');
					$('#form').trigger("reset");
				}
				alert.html(response.message)
			})
			.fail(function () {
				alert("error");
			});

	})
})
