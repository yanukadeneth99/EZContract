import { ERC721DataINT } from "../interface/DataInterface";

export default function getContractName(data: ERC721DataINT): string {
  let word = "ERC721";
  if (data.ismaxmintselected) {
    word += "M";
  }

  if (data.iswhitelistselected) {
    word += "W";
  }

  if (data.premintselected) {
    word += "P";
  }

  if (data.isuriselected) {
    word += "U";
  }

  return word;
}
