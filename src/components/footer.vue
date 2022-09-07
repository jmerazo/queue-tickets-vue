<template>
    <div class="footer">
		<div id="footer-copyright" class="col-6">
			<span id="footer-txt-queue-normal">©Queue </span>
			<span id="footer-txt-queue-oblique">- All rights reserved 2022</span>
		</div>		
		<div id="footer-social-networks" class="col-6">
			<a href="#"><font-awesome-icon id="fai-footer-rs" :icon="['fab', 'facebook']"/></a>
			<a href="#"><font-awesome-icon id="fai-footer-rs" :icon="['fab', 'instagram']"/></a>
			<a href="#"><font-awesome-icon id="fai-footer-rs" :icon="['fab', 'twitter']"/></a>
			<a href="#"><font-awesome-icon id="fai-footer-rs" :icon="['fab', 'youtube']"/></a>
		</div>					
	</div>
</template>

<script>
export default {
    name: 'Footer-Queue'
}
</script>

<style>
.footer {
	background: #54426b; 
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 35px;
	padding-top: 5px;
	display: flex;
}

#footer-social-networks{
	padding-right: 50px;
	text-align: right;
}

#footer-copyright{
	text-align: left;
	color: #ffffff;
	padding-left: 50px;
}

#footer-txt-queue-normal{
	font-style: bold;
}

#footer-txt-queue-oblique{
	font-style: oblique;
}

#fai-footer-rs{
	color: white;
	margin-left: 10px;
}
</style>