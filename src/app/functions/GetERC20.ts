import { ERC20DataINT } from "../interface/DataInterface";

export default function getContractName(data: ERC20DataINT): string {
  let word = "ERC20";
  if (data.premintselected) {
    word += "PM";
  }

  if (data.mintable) {
    word += "M";
  }

  if (data.burnable) {
    word += "B";
  }

  if (data.pausable) {
    word += "P";
  }

  return word;
}
