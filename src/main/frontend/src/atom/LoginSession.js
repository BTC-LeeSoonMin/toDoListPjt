import { atom, useRecoilState } from "recoil";

// export const loginedAdmin = atom({
//     key:"loginedAdmin",
//     default:null,

// })
export const loginedAdminState = atom({
    key:"loginedAdminState",
    default: null,

})

// function TextInput() {
//     const [text, setText] = useRecoilState(loginedAdmin);
  
//     const onChange = (event) => {
//       setText(event.target.value);
//     }
// }