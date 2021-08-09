// Adapted from http://jsfiddle.net/is_a_cat/UPtVA/2/
// Requires jQuery

var address = 'bc1q6zzx9gq4343rz8r5x95mdzw3qvc6rw7cdc50ur', // Set Donation Address
    goal = 0.001, // Your goal in BTC
    donorReference = 'SparkleVerse Testing Donation'; // Message that will appear in donor wallet

async function getReceived(address) {
    try {
        let blockchainUrl = 'https://blockchain.info/q/getreceivedbyaddress/' + address + '?cors=true';
        let data = await window.fetch(blockchainUrl, {
            mode: 'cors'
        }).then(response => response.json())
            .then(received => { return received });
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Initialize:
let donationUri = 'bitcoin:'+address+'?memo='+donorReference;
$('#donateButton').attr('href', donationUri);
$('#donateQR').attr('src', 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl='+encodeURIComponent(donationUri));

// Get Received amount and update components:
getReceived(address).then((received) => {
    let b2s = Math.pow(10, 8); // BTC to Sats
    let percentage = received / (goal * b2s) * 100;

    let width = percentage > 100 ? 100 : percentage;
    console.log(percentage);
    $('#donationbar').animate({
        width: width + "%"
    }, 2000);

    $('#percentagebtc').html(percentage | 0);
    $('#goalbtc').html(goal);
    $('#receivedbtc').html((received / b2s).toFixed(8));
});