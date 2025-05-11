import type { Community } from "../types"

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "xPortal Community",
    description: "Official xPortal community for MultiversX wallet users and enthusiasts.",
    platforms: ["telegram", "discord", "x"],
    inviteLinks: {
      telegram: "https://t.me/xPortalApp",
      discord: "https://discord.gg/xportal",
      x: "https://x.com/xPortalApp",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "admin@xportal.com",
    status: "approved",
    badges: ["starred", "on_fire"],
    clickCount: 1245,
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "2",
    name: "MultiversX Developers",
    description: "A community for developers building on the MultiversX blockchain.",
    platforms: ["discord", "telegram"],
    inviteLinks: {
      telegram: "https://t.me/MultiversXDevelopers",
      discord: "https://discord.gg/multiversxdevs",
      x: "",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "dev@multiversx.com",
    status: "approved",
    badges: ["starred"],
    clickCount: 987,
    createdAt: "2023-02-20T15:30:00Z",
    updatedAt: "2023-03-01T10:15:00Z",
  },
  {
    id: "3",
    name: "MVX Traders",
    description: "Trading strategies and market discussions for MultiversX ecosystem.",
    platforms: ["telegram", "x"],
    inviteLinks: {
      telegram: "https://t.me/MVXTraders",
      discord: "",
      x: "https://x.com/MVXTraders",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "admin@mvxtraders.com",
    status: "approved",
    badges: ["on_fire"],
    clickCount: 1102,
    createdAt: "2023-03-10T08:45:00Z",
    updatedAt: "2023-03-15T14:20:00Z",
  },
  {
    id: "4",
    name: "MVX NFT Collectors",
    description: "Community for NFT collectors and creators on MultiversX.",
    platforms: ["discord", "x"],
    inviteLinks: {
      telegram: "",
      discord: "https://discord.gg/mvxnft",
      x: "https://x.com/MVXNFTCollectors",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/3943726/pexels-photo-3943726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "nft@mvxcollectors.com",
    status: "approved",
    badges: [],
    clickCount: 768,
    createdAt: "2023-04-05T11:30:00Z",
    updatedAt: "2023-04-10T09:15:00Z",
  },
  {
    id: "5",
    name: "MultiversX Staking Group",
    description: "Discussions about staking, rewards, and validator nodes.",
    platforms: ["telegram", "discord"],
    inviteLinks: {
      telegram: "https://t.me/MVXStaking",
      discord: "https://discord.gg/mvxstaking",
      x: "",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/8370590/pexels-photo-8370590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "staking@mvx.com",
    status: "approved",
    badges: [],
    clickCount: 632,
    createdAt: "2023-05-12T13:45:00Z",
    updatedAt: "2023-05-18T10:30:00Z",
  },
]

export const pendingCommunities: Community[] = [
  {
    id: "6",
    name: "MVX DeFi Hub",
    description: "Community for DeFi enthusiasts in the MultiversX ecosystem.",
    platforms: ["telegram", "discord", "x"],
    inviteLinks: {
      telegram: "https://t.me/MVXDeFiHub",
      discord: "https://discord.gg/mvxdefi",
      x: "https://x.com/MVXDeFiHub",
      other: "",
    },
    imageUrl:
      "https://images.pexels.com/photos/7821479/pexels-photo-7821479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    submitterEmail: "admin@mvxdefi.com",
    status: "pending",
    badges: [],
    clickCount: 0,
    createdAt: "2023-06-02T09:15:00Z",
    updatedAt: "2023-06-02T09:15:00Z",
  },
]
