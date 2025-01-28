import { Idl } from "@project-serum/anchor";

export const IDL: Idl = {
  version: "0.1.0",
  name: "digital_marketplace",
  instructions: [
    {
      name: "listProduct",
      accounts: [
        { name: "seller", isMut: true, isSigner: true },
        { name: "productAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "price", type: "u64" },
        { name: "metadataUri", type: "string" },
        { name: "uniqueSeed", type: { array: ["u8", 32] } },
      ],
    },
    {
      name: "purchaseProduct",
      accounts: [
        { name: "buyer", isMut: true, isSigner: true },
        { name: "seller", isMut: true, isSigner: false },
        { name: "productAccount", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "price", type: "u64" },
        { name: "uniqueSeed", type: "bytes" },
      ],
    },
  ],
  accounts: [
    {
      name: "ProductAccount",
      type: {
        kind: "struct",
        fields: [
          { name: "seller", type: "publicKey" },
          { name: "price", type: "u64" },
          { name: "metadataUri", type: "string" },
          { name: "state", type: { defined: "ProductState" } },
          { name: "bump", type: "u8" },
        ],
      },
    },
  ],
  types: [
    {
      name: "ProductState",
      type: {
        kind: "enum",
        variants: [
          { name: "Listed" },
          { name: "Purchased" },
          { name: "Completed" },
          { name: "Cancelled" },
        ],
      },
    },
  ],
  errors: [{ code: 6000, name: "InvalidPrice" }],
};
