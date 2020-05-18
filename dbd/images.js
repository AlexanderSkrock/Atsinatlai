const PEKR_IMAGE_URL = perk_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Perks/${perk_tag}.png`

const SURVIVOR_PORTRAIT_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/Portrait/${name_tag}.png`
const SURVIVOR_PREVIEW_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/Preview/${name_tag}.png`
const SURVIVOR_SHOPBG_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Survivors/ShopBG/${name_tag}.png`

const KILLER_PORTRAIT_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/Portrait/${name_tag}.png`
const KILLER_PREVIEW_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/Preview/${name_tag}.png`
const KILLER_SHOPBG_URL = name_tag => `https://raw.githubusercontent.com/dearvoodoo/dbd/master/Killers/ShopBG/${name_tag}.png`

export {
    PEKR_IMAGE_URL as perkImageUrl,
    SURVIVOR_PORTRAIT_URL as survivorPortraitUrl,
    SURVIVOR_PREVIEW_URL as survivorPreviewUrl,
    SURVIVOR_SHOPBG_URL as survivorShopBgUrl,
    KILLER_PORTRAIT_URL as killerPortraitUrl,
    KILLER_PREVIEW_URL as killerPreviewUrl,
    KILLER_SHOPBG_URL as killerShopBgUrl,
}