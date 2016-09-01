var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var youtubedl = require('youtube-dl');
const spawn = require('child_process').spawn;

const _YOUTUBE_BASE = "https://www.youtube.com/watch?v=";
const _OUTPUT_DIR = "downloads/";
const _MP3_DIR = "mp3/";

/**
https://www.youtube.com/watch?v=37kbJUDzx1Y
https://www.youtube.com/watch?v=XTGcxCJwmpo
https://www.youtube.com/watch?v=wM0daiDlCQ0
https://www.youtube.com/watch?v=Hg90JDJF0PU
https://www.youtube.com/watch?v=6vopR3ys8Kw
https://www.youtube.com/watch?v=_nW5AF0m9Zw
https://www.youtube.com/watch?v=VePaI3jX4Sk
https://www.youtube.com/watch?v=7z-2E6p-yl8
https://www.youtube.com/watch?v=E4povfmX144
https://www.youtube.com/watch?v=F90Cw4l-8NY
https://www.youtube.com/watch?v=MYSVMgRr6pw
https://www.youtube.com/watch?v=GsPq9mzFNGY
https://www.youtube.com/watch?v=gwvw1LxKcFg
https://www.youtube.com/watch?v=UJWk_KNbDHo
https://www.youtube.com/watch?v=pTOC_q0NLTk
https://www.youtube.com/watch?v=aN5s9N_pTUs
https://www.youtube.com/watch?v=aqsL0QQaSP4
https://www.youtube.com/watch?v=dowdg9yYJds
https://www.youtube.com/watch?v=bCC1uO_AjXc
https://www.youtube.com/watch?v=Ef1nJWtkprU
https://www.youtube.com/watch?v=CyNcgqUjRe4
https://www.youtube.com/watch?v=xxJhiYW5bQg
https://www.youtube.com/watch?v=VxQ2IKct2Bg
https://www.youtube.com/watch?v=8inJtTG_DuU
https://www.youtube.com/watch?v=A1EJOnYvA5Q
https://www.youtube.com/watch?v=a8U9yBugQQw
https://www.youtube.com/watch?v=SUfR3KEjMEg
*/ 

var list = [
// "BPNTC7uZYrI",
// "37kbJUDzx1Y",
// "XTGcxCJwmpo",
// "wM0daiDlCQ0",
// "Hg90JDJF0PU",
// "6vopR3ys8Kw",
// "_nW5AF0m9Zw",
// "VePaI3jX4Sk",
// "7z-2E6p-yl8",
// "E4povfmX144",
// "F90Cw4l-8NY",
// "MYSVMgRr6pw",
// "GsPq9mzFNGY",
// "gwvw1LxKcFg",
// "UJWk_KNbDHo",
// "pTOC_q0NLTk",
// "aN5s9N_pTUs",
// "aqsL0QQaSP4",
// "dowdg9yYJds",
// "bCC1uO_AjXc",
// "Ef1nJWtkprU",
// "CyNcgqUjRe4",
// "xxJhiYW5bQg",
// "VxQ2IKct2Bg",
// "8inJtTG_DuU",
// "A1EJOnYvA5Q",
// "a8U9yBugQQw",
// "SUfR3KEjMEg"
// 	"nvyDtAM5qX4",
// 	"oIOiC_Q5SW4",
// 	"iUAjdoYQSIY",
// 	"pOGqjWH7Qd0",
// 	"TxaUc412_0k",
// 	"bSS2AGN19vA",
// 	"NgHMqbaRfr0",
// 	"3JARp8lB25g",
// 	"jYPz4ftAsgw",
// 	"p6kgiCgaKXk",
// 	"ADP65wbBUpc",
// 	"ilw-qmqZ5zY",
// 	"Mo4cmTaEDIk",
// 	"VjHMDlAPMUw",
// 	"vAEwLvxHVVk",
// 	"bvC_0foemLY",
// 	"lDsSiaSs9Bo",
// 	"zG2TEQvNwJU",
// 	"ckw4okeUzxE",
// 	"zO3J12uQIXI",
// 	"gAg3uMlNyHA",
// 	"5MJd0RTOW1Y",
// 	"7vzUh_55x2M",
// 	"qZMfB4l5fyQ",
// 	"XESoitVM2KQ",
// 	"mzgjiPBCsss",
// 	"Y2V6yjjPbX0",
// 	"pXRviuL6vMY",
// 	"vSk_xOy6Bwc",
// 	"cRp2109STFQ",
// 	"WIgy77p09XE",
// 	"x5SHQShUSSI",
// 	"Xq-knHXSKYY",
// 	"6Whgn_iE5uc",
// 	"jhigpewbg5s",
// 	"XUClIslXKZo",
// 	"A76a_LNIYwE",
// 	"UbQgXeY_zi4",
// 	"qaZ0oAh4evU",
// 	"WCTscsdKPWs",
// 	"8j741TUIET0",
// 	"ckw_U86ordc",
// 	"srPJ-s5uMbI",
// 	"bhW4vIFU3Co",
// 	"Uqy0qXU176Y",
// 	"lMQofCndDAA",
// 	"IKqV7DB8Iwg",
// 	"QwFHimQCBn0",
// 	"2fngvQS_PmQ",
// 	"o3W5ngVTtRE",
// 	"pEFxfVyz4Uc",
// 	"MrWd0m7pmq8",
// 	"txBfhpm1jI0",
// 	"64liF2VuLxI",
// 	"Z9rmdoJVny0",
// 	"HLUX0y4EptA",
// 	"FZVtc9zaAGg",
// 	"NjP5iHr8UnY",
// 	"N6voHeEa3ig",
// 	"0WxDrVUrSvI",
// 	"nWf-0WCniJQ",
// 	"NI2IzZxVaFU",
// 	"Pm2ww2RF2fc",
]

function finished(err, res) {
	if(err) throw err;

	console.log('Finished with result', res);
}

function convertToMp3(input, name, done) {
	console.log('Converting %s to mp3 in folder %s', name, _MP3_DIR);
	const ffmpeg = spawn('ffmpeg', ['-i', input, _MP3_DIR+name+'.mp3']);

	ffmpeg.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ffmpeg.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	ffmpeg.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		done(null)
	});
}

function downloadAudio(code, name, done) {
	var output = _OUTPUT_DIR+name+'.mp4'
	console.log('Downloading %s with name %s to file %s', code, name, output);

	var video = youtubedl(_YOUTUBE_BASE+code,
		['--extract-audio', '--audio-format', "mp3"], {}, console.log
	)

	video.on('error', console.error)

	video.on('info', function(info) {
		console.log('Download started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size);
	});

	video.pipe(fs.createWriteStream(output));

	video.on('end', function() {
		console.log('finished downloading of %s', output);

		convertToMp3(output, name, done);
	});
}

function download(code, done) {

	console.log('Downloading ', code);
	request(_YOUTUBE_BASE+code, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			$ = cheerio.load(body);
			var name = $('title').text().replace(' - YouTube', '');
			console.log('Parsed name for code %s:', code, name);

			downloadAudio(code, name, done)
		} else {
			console.error('ERROR: Cannot load page for code:', code);
			done(error)
		}
	});
}



if (!fs.existsSync(_OUTPUT_DIR)){
	fs.mkdirSync(_OUTPUT_DIR);
}

if (!fs.existsSync(_MP3_DIR)){
	fs.mkdirSync(_MP3_DIR);
}

async.mapLimit(list, 2, download, finished);