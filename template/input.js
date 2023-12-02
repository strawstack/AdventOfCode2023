(() => {
    const DAY = DAY_NUMBER;
    const bytes = CryptoJS.AES.decrypt(`ENCRYPTED_INPUT`, SECRET_KEY);
    input[DAY] = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
})();