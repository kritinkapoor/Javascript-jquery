$(document).ready(function(){

	

	var $sampleRow, $addTrUsers, $userTable, $spanEdit,
		$textUser, $textEmail, $textPhone, $textWebsite, 
		$containerForm, $myTable, $userId, userNum;

	$sampleRow = $('#sampleRow');
	$userTable = $('#userTable');
	$spanEdit = $('#spanEdit');
	$spanDelete = $('#spanDelete');

	$textUser = $('#textUser');
	$textEmail = $('#textEmail');
	$textPhone = $('#textPhone');
	$textWebsite = $('#textWebsite');
	$containerForm = $('#containerForm');
	$myTable = $('#myTable');
	$userId = $('#userId');

	userNum= 1;

	function Init(){
		$.ajax({
			url : 'http://jsonplaceholder.typicode.com/users',
			type: 'GET',
			async: true,
			success: DataLoad
		});


		$containerForm.hide();		

	}


	function DataLoad(users){
		var i;
		for(i=0;i<users.length;i++){
			AddRow(users[i])
		}
	}

	function AddRow(user){
		$addTrUsers = $sampleRow.clone();
		$addTrUsers.removeAttr('hidden');
		$addTrUsers.removeClass('hidden');
		$addTrUsers.find('td:nth-child(2)').html(user.name);
		$addTrUsers.find('td:nth-child(3)').html(user.email);
		$addTrUsers.find('td:nth-child(4)').html(user.phone);
		$addTrUsers.find('td:nth-child(5)').find('a').attr('href',user.website).html(user.website);
		$addTrUsers.attr('id', userNum);
		userNum= userNum+ 1;

		$addTrUsers.appendTo($userTable);
	}

	function EditUser(e){
		console.log('edit');
		console.log($(e.target).closest('tr').html());

		var $editUserDetails = $(e.target).closest('tr');

		var user = {
			userId: $editUserDetails.attr('id'),
			name: $editUserDetails.find('td:nth-child(2)').html(),
			email: $editUserDetails.find('td:nth-child(3)').html(),
			phone: $editUserDetails.find('td:nth-child(4)').html(),
			website: $editUserDetails.find('td:nth-child(5) a').html()
		};


		SetUserInfoForm(user);


		$containerForm.show();

	}

	function DeleteUser(e){
		if(confirm('Are you sure you want to delete user details?')){
			$(e.target).closest('tr').remove();	
		}
		
		console.log('Delete');
	}

	function AddNewUser(){
		var user = {
			userId: -1
		}


		console.log("Add user")
		$containerForm.show();

		$textUser.val("");
		$textEmail.val("");
		$textPhone.val("");
		$textWebsite.val("");

		SetUserInfoForm(user);
	}

	function SetUserInfoForm(user){
		if(user.userId === -1){
			$userId.val("-new-");
			$textUser.val("");
			$textEmail.val("");
			$textPhone.val("");
			$textWebsite.val("");
		}
		else{
			$userId.val(user.userId);
			$textUser.val(user.name);
			$textEmail.val(user.email);
			$textPhone.val(user.phone);
			$textWebsite.val(user.website);
		}
	}

	function CancelPopup(){
		$containerForm.hide();
		console.log("cancel");
	}

	function Save(){
	

		var user = {
			userId: $userId.val(),
			name: $textUser.val(),
			email: $textEmail.val(),
			phone: $textPhone.val(),
			website: $textWebsite.val()
		};

		if(!(user.name&&user.email)){

			console.log("Required Field");

		}



		if($("tr[id="+user.userId+"]").length){
			$("tr[id="+user.userId+"]").children().eq(1).html(user.name);
			$("tr[id="+user.userId+"]").children().eq(2).html(user.email);
			$("tr[id="+user.userId+"]").children().eq(3).html(user.phone);
			$("tr[id="+user.userId+"]").children().eq(4).children().eq(0).html(user.website);
		}
		else{
			AddRow(user);			
		}


		$containerForm.hide();
		console.log("Save");
	}






	$userTable.on('click', 'span[action=edit]', EditUser);

	$userTable.on('click',"span[action=delete]",DeleteUser);


	$("#btnAdd").bind('click',AddNewUser);
	$("#btnCancel").bind('click',CancelPopup);
	$("#btnSave").bind('click',Save);


	Init();
	

});
