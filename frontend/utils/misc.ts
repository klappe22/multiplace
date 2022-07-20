import { mainnet, nile } from './addresses';

export const metadataURIToImageURI: { [key: string]: string } = {
  // soyjaks
  'ipfs://bafybeigwfiypei55jvwl3ghvlvuiinpxqkfodomsa7dw3bmotnqkpstgg4/metadata.json':
    'ipfs://QmaG71taq8avgTCXNhYxKemKpP3oMD9hKiht2b1gCxo3o1',
  'ipfs://bafybeid5ufgqpoq2r7mnq2vwacvtywpfhifj2my47cvbfye6cxmq4ig55q/metadata.json':
    'ipfs://Qmf1HXwNMLSXH18NguMiju6CtLzEexfwPYEpSmtEMTGobW',
  'ipfs://bafybeiaaz7vawth7bm5keleyilbma737lhtjbsfifexslrdtbidlwg7ff4/metadata.json':
    'ipfs://QmeH6CwLe8uZ626hovXz6ByHHyLe8YALpyAD4eV8L1SDJX',
  'ipfs://bafybeihjxo6d26cykfz62m43i6vgfot6rvdxfno4chwg5ftq6ql7qwkgsm/metadata.json':
    'ipfs://Qmav7T6Qy99Sq8JkSnrykxHZ9JgJt7q6gaxa5qgAJsC3mh',
  'ipfs://bafybeigrfi6vdmmq4ag7qxsnzhsmpqt6cgxpwfkxvvbmh4ur22ryt43m6m/metadata.json':
    'ipfs://QmNQtpwKWrwsViuAQoiMcf8asMn1LGH949tUipjbGnZPNv',
  'ipfs://bafybeigetqt7nliefccv7y3jhmyxnrcs3jgxzxpdarvi33grnqdzyu4fou/metadata.json':
    'ipfs://QmZ76A67sCE3AcEF9kd1czxv3YcXc86ZjtrqAcMpttNcNE',
  'ipfs://bafybeifqy7rr66dw4duhulqfxbutahulol6heh6ox2uxy5apdehtqr35xa/metadata.json':
    'ipfs://QmSbWdJBrP9TTX9NTykXHCmKNbs68rqd727obHZqcfeLVB',
  'ipfs://bafybeicmz3ukhz2pno5iarwb5ryilhotphhbnc47ymz3k5pc4hze7zclk4/metadata.json':
    'ipfs://QmeVsiKx3xBsqkeqhAjuBGLRmyrsR9YwEmzo1Z4zX9UnSw',
  'ipfs://bafybeihsfh2hns2rbjhyheagcvgzujunskerwhxt2naxhs6kgrl2kt2fyq/metadata.json':
    'ipfs://QmbBAPGyUz6jwbcpfLcrdbBosPn5cZnVH559nouQ9i7LY8',
  'ipfs://bafybeifsmszfcwbx3nxh77gqrxy4jd6feocqi6fjkrpenqg3ryhwcfgahm/metadata.json':
    'ipfs://QmfDcfqHyd3fGTw8wWre7CV71VKEFY5wTVu49Puo4QLxf6',
  'ipfs://bafybeigyb377xulgqci4vzoe2lks2exsr2gb4by4jy6hw2tiotbvuiarr4/metadata.json':
    'ipfs://QmVywVQPKcsjoqcoN5GrKQMW4ByVr8RRHxJrtGedCYwUFW',
  'ipfs://bafybeieildb3p67txxat3u5ojbf6wep2kp3pzubsbvihs24adtda2mjdfu/metadata.json':
    'ipfs://QmTUBDbP6QPyaq7SX5frXhVRw4feZQ3fwUaZE62ouwt2Kk',
  'ipfs://bafybeidxkboaohn7ltssbmmorlxz6zo2mqpxejyvc6242rafdrddk5fasy/metadata.json':
    'ipfs://Qma85uJ8wcJQrYWaq1Vxzt6mXMUsRG6xQPqPT3YhtEoWsy',
  'ipfs://bafybeie2kubxtllarjerv4wjonh3gr4bc6ias3izvpspmf3vkxbdagi2eq/metadata.json':
    'ipfs://QmSr1fmz45zg26XDVLJLiZarCQNuzxgQNHpY9GnWWnjdCo',
  'ipfs://bafybeicesjc7f3dva5rqix5rim4v7qvvqdjwlsgcnpfepp6mllioxx74qm/metadata.json':
    'ipfs://QmSod8cTz78oVtM1K4s71MgcogNXzbtTtKLvoXVSoG8GdG',
  // wojaks
  'ipfs://bafybeibo67lskbn5zy4fzrulwhdf7b2koj5c7n4wuiatpf6lvwwuxysvzu/metadata.json':
    'ipfs://QmXYbkdXqmi53mruGJd3yg53qib8iFqg4kWk8kznuAbFsL',
  'ipfs://bafybeia3o2alzp6cbkwor7f6th6ba22rt7e44hnfn7fldd6na5l4rpdikm/metadata.json':
    'ipfs://QmYDR3h5He39PGBXNAUdcsgBKTb9AZs49FxbYHFyeDtFyr',
  'ipfs://bafybeig6wb7huwt6rr6v53cqd5krqbdn5rsniyby45lzu2xque24msmrjy/metadata.json':
    'ipfs://QmPvjfDrvtWVRf8scVcgqKCbDB8oydM9BJQeTcMBY4FNaV',
  'ipfs://bafybeieaua4lxqen3mqftq5jtqkvjctrkdutxfkvvcjolqma5noecarkmy/metadata.json':
    'ipfs://QmedQkFTA8ikQWcbF1dz89iePGzJsNomWAEJEEqBCj4DGQ',
  'ipfs://bafybeiakkqkhomzhhigmkb5mt32fyty2zfsfujhhrrkipdadwi26ixetvq/metadata.json':
    'ipfs://QmQsUz463g5mAJg43pFLJfuQfzs7uwb5cfMy5bLYhtXDUs',
  'ipfs://bafybeifzcukfp2ohvb3sxoxjsfkpgtm4ixutu2v6377lylhzrwqapqh7aq/metadata.json':
    'ipfs://QmWcgf3utpmSfyxXgRnDFGoA1DPTvKkNNKoXzyKCiBRg3r',
  'ipfs://bafybeigxxbwhyc7v7wsxwquzrlvbzy4wmhblopu2lhesqj2mrmh5gpxaca/metadata.json':
    'ipfs://Qmb8HH7nMMjuSA7iNv2nZy6TJ7PCTNDkThyo33CWCMHFC8',
  'ipfs://bafybeichugdjqb2nk54diwrsuqpm44zk6xvbgdlzltmkjlxhck7hwfx4om/metadata.json':
    'ipfs://QmZNXWus8c6tz6rcp5ZvoP7vntDgC2C986fhhRwjRtjytj',
  'ipfs://bafybeifg5y5j7yuy2ks44fgyp3av5cs54xhlfw7wy26vcgav7rxuslq5fy/metadata.json':
    'ipfs://QmSzqJLV8bxZvLxnFXM4obkpdpi7QixjeNHwLVUvReQh6G',
  'ipfs://bafybeif6x6ykwon2f52mngjbw4b6eoaeabualzboaketqppa5ej6dzg7xu/metadata.json':
    'ipfs://QmXyPReX8b39j6EotaFQksRyHitN5UuvyUdtMxqxVSeuej',
  'ipfs://bafybeihofs7q3ie37p25yswyjoqmsj75akdlrm6f7o2jtnpacuoi7pou3m/metadata.json':
    'ipfs://QmRRzky9t4r3y1ABSXc4GMcTcMn9pPCihxa9oRzQ2EhkHT',
  'ipfs://bafybeid6hpjgzvwq4fhbh4rujcpvz43pnw5kprcfjwgmqd5c2j6a5ydpci/metadata.json':
    'ipfs://QmQsYVhDrR91cakatcGF6QSr7SadUbQwi9WJcCRLxEFwDw',
  'ipfs://bafybeid36274kpaiccg4uobpdrjuztw4fe65bnz6zojyc6crhvo5oawpyq/metadata.json':
    'ipfs://QmUj7z8oMjo8TVU7xpBWB3DHXJQw2NWDurbyS4duFhZN8D',
  'ipfs://bafybeidafkpa7yitavetlkd6lmxmc3jytgjkeb3umzuhj72oba4exfhdfm/metadata.json':
    'ipfs://QmY4pL1fdNZGDQSw4sEbiqd4feWYLVq6gT7H5D7R718c2r',
  'ipfs://bafybeibzyyematdcd3mrqh52yugquuamhjaaqg4cet5g7qhnoq7xbmqjdu/metadata.json':
    'ipfs://QmZsZZcbeKnD12yUZuJDp2tBLnUCoZbEpJfaCRBMxAAwnu',
  // doomer
  'ipfs://bafybeiatqz7yx7ijgxfpppib2kjfjjlch473msa5xd53erfg6xfkc2eurq/metadata.json':
    'ipfs://QmRLJ3MjjxWGXPNfHXvf2QFR8ZVdTL9yyuy8D9pDj6tXEU',
  'ipfs://bafybeifbjm5oh42jtpwshc7eexseptje35isu57vtrw6sf4njighspdwpa/metadata.json':
    'ipfs://QmPPRUQpjUV8179WJ7aPJZMGEc4em7gbiWqYAPrJT56u5E',
  'ipfs://bafybeif63kt47vc57hi7zon3jedamftoazfknpsikdnfqfi7muefmw766u/metadata.json':
    'ipfs://QmP2QRYiMmnMqFGhyPhmhtdmysW8p3ZMSX5FnSpw9Dym8g',
  'ipfs://bafybeif3xart3eqg2qkxfb3r3bf2hsyhell7aqg7zt2fhu34vll5ce57lm/metadata.json':
    'ipfs://QmdacQobK3JmSmcWuPTP2uujJmauCospXKcnxmR9GR1Zwi',
  'ipfs://bafybeicwow2i2uyzcicrirz7mgmsyhyleg6ad6frmadtiixnfbcuo6nike/metadata.json':
    'ipfs://QmNVPHQ6qPFKpMqnkeT73HtdQZgL2PjpZDekGiPeGpBNxk',
  'ipfs://bafybeiglpyulgpxolgjlml7qjalb2wfjuxtjix5pspzpydwoiol5jzvgme/metadata.json':
    'ipfs://QmUo8KWazn81P5xiePXQqRPAKZmREshDs4DtrUZMaHFKDJ',
  'ipfs://bafybeica7rmoqkqzw3woofqewmuaxltfvmz6xyxmdojkghtoaujtt5dbae/metadata.json':
    'ipfs://QmchrmwAyQNbYXXzGrYeiWY4A6Vuo9hK2ZwCAQ8uB6YsHt',
  'ipfs://bafybeian7uyuli4edxfwrrko53wayv5trtbr3uvgomzrqbbdwtkwbd3zhi/metadata.json':
    'ipfs://QmRjHkSnAaBUMcrGsCaerP3cTZfRteADVuESNU2xaqrAh5',
  'ipfs://bafybeiax25bzylv2qlogltulvvo2p7i36kowtkfb7ipnfxig3q2fpi5obq/metadata.json':
    'ipfs://Qmd1b3DB9F8RqLU8F7TR5nWSxpHFDrY9mpsqo7PkjchCon',
  'ipfs://bafybeibjjozv5d55ocnlweueevn5ntvycx45clgbru6qw62t4rnzjebt7m/metadata.json':
    'ipfs://QmXVR2A7rVkADAV7ky5Sew3Sse5ote1JHhQXW8TFJVDMLt',
  'ipfs://bafybeicqredsfk4vw7hhe47o7pff6a5ricl4iziysp6xpoznyt6bkiokci/metadata.json':
    'ipfs://QmV51Asu8csDj5nuNCrKXUfcGfGhFX9NV2utuzxqZpcw1B',
  'ipfs://bafybeia43pxdjbmvgoibomex34bxk2nzuo7r5yzzn25vyhxnixrgmfgvei/metadata.json':
    'ipfs://QmX6VfDo9RJaGkiVadbuuNnpnt8cz1Y8dNi7p4MQnVfiaJ',
  'ipfs://bafybeib6di7uq56ythudix7vmvuvnp5kfc7u5stlyl3egao3jsannewcz4/metadata.json':
    'ipfs://Qmb3G7ajsyYxKuFnKXiwu4zGcxeCzKoPjrh58LLvym8wab',
  'ipfs://bafybeiaam7vzcyslra62x5xxfc7okreq4vdinubjgl7wdzk5lxr7x4ofie/metadata.json':
    'ipfs://QmWqrGmoJ8q2x8T7CPyeSZvE3KdRJjJc1EDG3d35uTncSm',
  'ipfs://bafybeidvhm6kbcpiyaq6ol2cnpngsmhun2yul4cwfuu5pbvvbyrft7kylu/metadata.json':
    'ipfs://QmP1id7DMhKNWAoZ5BABWAGtqeagZqFzaDcSAyAK5dwNWt',
  // whalefish
  'ipfs://bafybeihnf5pllk7rvvkbzhuh77q4beaoakukrk43xfizrlxwkmvqje2gri/metadata.json':
    'ipfs://Qmc4KP9r3gzUgjdHx4tPUYMf8JPt5YV3J7gejf2qeiwKQA',
  'ipfs://bafybeidakl2agxv6y7acp3q23kyf44ufrygivywjyo77nblvqayiymrhfq/metadata.json':
    'ipfs://QmVrzzcM76CPvZmJNJiGsJceSu2SHSx4TqMhfmSZTX5Fix',
  'ipfs://bafybeib55d6ss4dnc2rsxj2xm44ibkh36fpx6ngopsou7yfx5gypplpxn4/metadata.json':
    'ipfs://QmVC8VBLRwCs8h5EnDEHMpkCRh6wAbaLGQyVoVA5jUKFio',
  'ipfs://bafybeiaimwtl7ardgglxhwszp2ndm5nltr4xie5xfblxof7h34jm5rqjha/metadata.json':
    'ipfs://QmSgQpAPweaH2CxZwYTguKc9qDMbK3AaKre5axGmmkPhno',
  'ipfs://bafybeiay7vkjvplijqapcczscf5fig3nustyeklrv6wwyav665xihj7btm/metadata.json':
    'ipfs://QmbBRFuCeqsez9iqqigdLZHocRLjFvh1ThmNMJYWkAMnLs',
  'ipfs://bafybeiapdrg2amzazbuxbiogh2bszhm3tpa5ufxh3t6mzajzm4sgj3q4gi/metadata.json':
    'ipfs://QmcJNe5JefKzn989feBDCqu6xdtN3Fx8NmpdJPZr3WFoVR',
  'ipfs://bafybeidxs3ttijhm3jg7buzmccdszoi3poi2invlklg7w673ujl4q3mkia/metadata.json':
    'ipfs://QmXv91jpZ7HfCeyaNVKNMiFF394iTCWVLzeNGCTL5rAzpY',
  'ipfs://bafybeieces4fyi3xzhxb4uj3wrbupy25jzyzdk37cqkpxebbr3oxy4gumy/metadata.json':
    'ipfs://QmUa9zyA6WayiUQt5hZMG77GBkeutrfEMWckZHNak857U9',
  'ipfs://bafybeifzt7xugw7lcaor3ssmzjenpulttnls7ohmzqvn7by5wjrbck3dxe/metadata.json':
    'ipfs://QmT2Kwdazgh9Nj9PZATHHhZMLDxrxwnBXvDd4imqRQdnMC',
  'ipfs://bafybeiastikpmcegg7qrxeq7gz3macticqraifbua74umfgvf5vipfef6i/metadata.json':
    'ipfs://Qmar3KkZuycGk4SaE6bWEcAyBE7yyz1y14ZbyjYAZyUZ7u',
  'ipfs://bafybeiacn2lf2b3jrpreey3x5p6h7wyrwsjc7txoaa5fpbnxizf2olyzky/metadata.json':
    'ipfs://Qme3cPTPxa3f6sCpHNKt8TV4Fw3MAcdBUSwQa24vVk4R3R',
  'ipfs://bafybeibrtvtj24thwvyg4kja5gyrziutpha6rhskkbvvyuqbixllt2brfe/metadata.json':
    'ipfs://QmW9PgvLGxpinShvPTeceFt9CLXx232QJnV2hkLeL22eZQ',
};

export const assetToPriceFeed: { [key: string]: any } = {
  nile: {
    trx: 'TAL6RWymPLepKsLGCzWPUTKQQcWFsuHfNE',
    btc: 'TYY5GdNvHN8NVY6MYtgEPwx15pyUmLEw5J',
  },
  mainnet: {
    trx: 'TXwZqjjw4HtphG4tAm5i1j1fGHuXmYKeeP',
    btc: 'TTzPaLxJMy8nwXe9NRfHopHW4KyUeavLdF',
    usd: 'TZCPyp7fWW3xnQ6gv5LG9v7S7VYbr4h2H1',
  },
};

export const collectionNameToNameAndDescription: { [key: string]: any } = {
  wojaksbyprice: {
    name: 'Wojaks By Price',
    description:
      "A collection of Wojaks and Wojak derivatives representing the mood after a price change. If the price hasn't changed much, Wojak is neutral. If it's down much, Wojak is mad. If it's up then Wojak is happy. Every NFT represent a different asset, which is shown in the images and metadata.",
  },
  whalefish: {
    name: 'WhaleFish',
    description:
      "A collection of Whales and Fishes, where the active image for a NFT changes depending on the balance of it's owner. If the owner have more than 1000TRX, then it's a whale, otherwise it's a fish.",
  },
};

export const collectionNameToAddress: {
  [key: string]: { [key: string]: any };
} = {
  mainnet: {
    wojaksbyprice: mainnet.wojaksByPrice,
    whalefish: mainnet.whaleFish,
  },
  nile: {
    whalefish: nile.whaleFish,
    wojaksbyprice: nile.wojaksByPrice,
  },
};
