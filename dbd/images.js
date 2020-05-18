const PEKR_IMAGE_URL = perk_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Perks/${perk_tag}.png`

const SURVIVOR_PORTRAIT_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/Portrait/${name_tag}.png`
const SURVIVOR_PREVIEW_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/Preview/${name_tag}.png`
const SURVIVOR_SHOPBG_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/ShopBG/${name_tag}.png`

const KILLER_PORTRAIT_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/Portrait/${name_tag}.png`
const KILLER_PREVIEW_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/Preview/${name_tag}.png`
const KILLER_SHOPBG_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/ShopBG/${name_tag}.png`

export default {
    perkImageUrl: PEKR_IMAGE_URL,
    survivorPortraitUrl: SURVIVOR_PORTRAIT_URL,
    survivorPreviewUrl: SURVIVOR_PREVIEW_URL,
    survivorShopBgUrl: SURVIVOR_SHOPBG_URL,
    killerPortraitUrl: KILLER_PORTRAIT_URL,
    killerPreviewUrl: KILLER_PREVIEW_URL,
    killerShopBgUrl: KILLER_SHOPBG_URL,
}