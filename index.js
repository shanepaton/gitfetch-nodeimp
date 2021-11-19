import fetch from 'node-fetch';
import fs from 'fs';
import toml from 'toml';
import chalk from 'chalk';

var config = toml.parse(fs.readFileSync('conf.toml', 'utf8'));
var cla = process.argv.slice(2);
var structErrTxt = "Usage: gitfetch <username> <platform> --option";

async function getUrlAsync(url, name, token = "") {
	try {
		let response

		if (token == "") {
			response = await fetch(url + name)
		} else {
			response = await fetch(`${url+name}`, {
				headers: {
					'authorization': `Bearer ${config.gitlabToken}`,
					'user-agent': 'gitfetch'
				}
			});
		}
		return await response.json();
	} catch (err) {
		console.error(err);
	}
}

function notBlank(varToCheck) {
	if (varToCheck !== null || varToCheck !== undefined || varToCheck !== "" || varToCheck !== " " || varToCheck !== false) {
		return true;
	} else {
		return false;
	}
}

function validateOut(info) {
	if (notBlank(info)) {
		return info;
	} else {
		return 'Not Available';
	}
}

function hexColorOut(hex, text, hex2 = "", text2 = "", hex3 = "", text3 = "", hex4 = "", text4 = "", hex5 = "", text5 = "", uncoloredText = "") {
	console.log(chalk.hex(hex)(text) + chalk.hex(hex2)(text2) + chalk.hex(hex3)(text3) + chalk.hex(hex4)(text4) + chalk.hex(hex5)(text5) + uncoloredText);
}


let avData = [false, false]

if (notBlank(config.githubUsername)) {
	avData[0] = true;
}

if (notBlank(config.gitlabId)) {
	avData[1] = true;

}


if (cla[1] === '--gh' || cla[1] === '--github' || config.defaultSite === 'github') {
	var isNotPresent = false;
	if (!cla[0]) { isNotPresent = true; };
	getUrlAsync("https://api.github.com/users/",  isNotPresent ? config.githubUsername : cla[0]).then(function(user) {
		console.log(`        @@@@@@@@@@@@@@@                  gitfetch - Github`);
		console.log(`     @@@@@@@@@@@@@@@@@@@@@               ~~~~~~~~~`)
		console.log(`   @@@@    @@@@&@@@@    @@@@             Username:  ${validateOut(user.login)}`)
		console.log(`  @@@@@                 @@@@@            Name:      ${validateOut(user.name)}`)
		console.log(` @@@@@                   @@@@@           Bio:       ${validateOut(user.bio)}`)
		console.log(` @@@@@                   @@@@@           Website:   ${validateOut(user.blog)}`)
		console.log(` @@@@@                   @@@@@           Location:  ${validateOut(user.location)}`)
		console.log(` @@@@@@@               @@@@@@@           Followers: ${validateOut(user.followers)}`)
		console.log(`  @@@@ @@@@@       @@@@@@@@@@            Following: ${validateOut(user.following)}`)
		console.log(`    @@@            @@@@@@@@              Repos:     ${validateOut(user.public_repos)}`)
		console.log(`       @@@@@       @@@@@                 `);
	});
} else if (cla[1] === '--gl' || cla[1] === '--gitlab' || config.defaultSite === 'gitlab') {
	
	var isNotPresent = false;
	if (!cla[0]) { isNotPresent = true; };

	let glColors;
	if (config.noColor || cla[3] === '--nocolor' || cla[3] === '--nc') {
		glColors = ["FFFFFF", "FFFFFF", "FFFFFF"];
	} else {
		glColors = ["FCA326;", "FA6C25", "E04228"];
	}
	getUrlAsync("https://gitlab.com/api/v4/users/", isNotPresent ? config.gitlabId : cla[0], config.gitlabToken).then(function(userG) {
		hexColorOut(glColors[2], `     ((                  ((`, '', '', '', '', '', '', '', '', `              gitfetch - Gitlab`);
		hexColorOut(glColors[2], `    ((((                ((((`, '', '', '', '', '', '', '', '', `             ~~~~~~~~~`)
		hexColorOut(glColors[2], `   ((((((              (((((`, '', '', '', '', '', '', '', '', `             Username:  ${validateOut(userG.username)}`)
		hexColorOut(glColors[2], `  (((((((             (((((((`, '', '', '', '', '', '', '', '', `            Name:      ${validateOut(userG.name)}`)
		hexColorOut(glColors[0], ` //`, glColors[1], `///////`, glColors[2], `(((((((((((`, glColors[1], `///////`, glColors[0], `//`, `           Bio:       ${validateOut(userG.bio)}`)
		hexColorOut(glColors[0], ` ////`, glColors[1], `//////`, glColors[2], `(((((((((`, glColors[1], `///////`, glColors[0], `////`, `          Pronouns:  ${validateOut(userG.pronouns)}`)
		hexColorOut(glColors[0], `//////`, glColors[1], `//////`, glColors[2], `((((((((`, glColors[1], `/////`, glColors[0], `//////`, `          Website:   ${validateOut(userG.website_url)}`)
		hexColorOut(glColors[0], `   /////`, glColors[1], `/////`, glColors[2], `((((((`, glColors[1], `////`, glColors[0], `/////`, `             Location:  ${validateOut(userG.location)}`)
		hexColorOut(glColors[0], `      ////`, glColors[1], `///`, glColors[2], `(((((`, glColors[1], `///`, glColors[0], `////`, `                Followers: ${validateOut(userG.followers)}`)
		hexColorOut(glColors[0], `          //`, glColors[1], `//`, glColors[2], `(((`, glColors[1], `//`, glColors[0], `///`, `                   Following: ${validateOut(userG.following)}`)
		hexColorOut(glColors[0], `             /`, glColors[1], `/`, glColors[2], `(`, glColors[1], `/`, glColors[0], `/`);
	});
}