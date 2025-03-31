var demo1 = new Moovie({
  selector: "#example",
  icons: {
         path: "https://raw.githubusercontent.com/BMSVieira/moovie.js/main/icons/"
  }
});
       
pla =  demo1.playerElement.id; 
var client = new WebTorrent();
var torrentId = 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4';
torrentId='magnet:?xt=urn:btih:6a02592d2bbc069628cd5ed8a54f88ee06ac0ba5&dn=CosmosLaundromatFirstCycle&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=http%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=http%3A%2F%2Fia601508.us.archive.org%2F14%2Fitems%2F&ws=http%3A%2F%2Fia801508.us.archive.org%2F14%2Fitems%2F&ws=https%3A%2F%2Farchive.org%2Fdownload%2F'
client.add(torrentId, function (torrent) {
    var file = torrent.files.find(function(file) {
       return file.name.endsWith('.mp4');
     });
    var container = document.getElementById(pla);
    file.renderTo(container, { autoplay: false })
});