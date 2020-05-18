/*
 ' All the following functions are based on this documentation
 * https://bridge.buddyweb.fr/docs/dbd
 * https://github.com/dearvoodoo/dbd/wiki
 */
import fetch from "node-fetch"

const BASE_API_URL = "https://bridge.buddyweb.fr/api/dbd/"

const sendJsonApiRequest = url => fetch(url).then(response => response.json())

const optionsToQueryString = options => {
    const arrOptions = options ? Object.entries(options) : []
    return arrOptions.length > 0 ? `?${arrOptions.map(option => option.join("=")).join("&")}` : ""
}

const sendDbDApiRequest = (branch, options) => sendJsonApiRequest(`${BASE_API_URL}${branch}${optionsToQueryString(options)}`)

/*
Options
Name            Type
role 	        STRING
name 	        STRING
name_tag 	    STRING
perk_name 	    STRING
perk_tag 	    STRING
desc 	        STRING
teach_level 	STRING
 */
const getPerks = options => sendDbDApiRequest("perks", options)

/*
Options
full_name 	    STRING
name_tag 	    STRING
gender 	        STRING
role 	        STRING
nationality 	STRING
voice_actor 	STRING
overview 	    STRING
lore 	        STRING
difficulty 	    STRING
dlc 	        STRING
dlc_id 	        STRING
 */
const getSurvivors = options => sendDbDApiRequest("survivors", options)

/*
Options
name 	        STRING
name_tag 	    STRING
full_name 	    STRING
alias 	        STRING
gender 	        STRING
nationality 	STRING
realm 	        STRING
power 	        STRING
weapon 	        STRING
speed 	        STRING
terror_radius 	STRING
height 	        STRING
voice_actor 	STRING
difficulty 	    STRING
overview 	    STRING
lore 	        STRING
dlc 	        STRING
dlc_id 	        STRING
 */
const getKillers = options => sendDbDApiRequest("killers", options)

export default {
    getPerks,
    getSurvivors,
    getKillers,
}