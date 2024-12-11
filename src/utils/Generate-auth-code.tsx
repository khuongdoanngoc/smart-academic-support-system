export const GenerateAuthCode = () => {
    const otpString = Math.floor(100000 + Math.random() * 900000).toString();
    return otpString;
}