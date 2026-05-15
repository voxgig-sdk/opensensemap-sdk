package = "voxgig-sdk-opensensemap"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/opensensemap-sdk.git"
}
description = {
  summary = "Opensensemap SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["opensensemap_sdk"] = "opensensemap_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
