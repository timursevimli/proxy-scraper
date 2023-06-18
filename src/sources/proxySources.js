'use strict';
const TARGET_URLS = [
  'https://free-proxy-list.net/',
  'http://free-proxy.cz/en/',
  'https://www.geonode.com/free-proxy-list/',
  'https://github.com/clarketm/proxy-list/blob/master/proxy-list.txt',
  'https://spys.me/socks.txt',
  'http://spys.me/proxy.txt',
  'http://www.httptunnel.ge/ProxyListForFree.aspx',
  'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.json',
  'https://raw.githubusercontent.com/fate0/proxylist/master/proxy.list',
  'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt',
  'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
  'https://www.us-proxy.org/',
  'https://free-proxy-list.net/',
  'https://www.sslproxies.org/',
  'https://www.proxy-list.download/api/v0/get?l=en&t=https',
  'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=6000&country=all&ssl=yes&anonymity=all',
  'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
  'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
  'https://www.hide-my-ip.com/proxylist.shtml',
  'https://raw.githubusercontent.com/scidam/proxy-list/master/proxy.json',
  'https://www.proxy-list.download/api/v1/get?type=https',
  'https://www.proxy-list.download/api/v1/get?type=http',
  'https://www.proxy-list.download/api/v1/get?type=socks4',
  'https://www.proxy-list.download/api/v1/get?type=socks5',
  'https://2ip.ru/proxy/',
  'https://proxypedia.org/',
  'http://rootjazz.com/proxies/proxies.txt',
  'http://free-fresh-proxy-daily.blogspot.com/',
  'https://free-proxy-list.net',
  'https://premiumproxy.net/',
  'https://github.com/ShiftyTR/Proxy-List/blob/master/proxy.txt',
  'https://github.com/ShiftyTR/Proxy-List/blob/master/http.txt',
  'https://github.com/ShiftyTR/Proxy-List/blob/master/https.txt',
  'https://github.com/ShiftyTR/Proxy-List/blob/master/socks4.txt',
  'https://github.com/ShiftyTR/Proxy-List/blob/master/socks5.txt',
  'https://ab57.ru/proxylist.html',
  'https://xseo.in/freeproxy',
  'http://russianproxy.ru/proxy_list_http_fastest',
  'https://github.com/TheSpeedX/PROXY-List/blob/master/http.txt',
  'https://github.com/TheSpeedX/PROXY-List/blob/master/socks5.txt',
  'https://github.com/TheSpeedX/PROXY-List/blob/master/socks4.txt',
  'https://github.com/opsxcq/proxy-list/blob/master/list.txt',
  'https://github.com/x-o-r-r-o/proxy-list/blob/master/proxy-list.txt',
  'https://free-proxy-list.net/anonymous-proxy.html',
  'https://free-proxy-list.net/uk-proxy.html',
  'https://www.us-proxy.org/',
  'https://free-proxy-list.net/',
  'https://api.proxyscrape.com/?request=getproxies&proxytype=all&country=all&ssl=all&anonymity=all',
  'https://www.sslproxies.org/',
  'https://proxy-daily.com/',
  'https://proxypremium.top/download-proxy-list',
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=socks4',
  'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4',
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=socks4&country=all',
  'https://api.openproxylist.xyz/socks4.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks4.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
  'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt',
  'http://worm.rip/socks4.txt',
  'https://www.proxy-list.download/api/v1/get?type=socks4',
  'https://www.proxyscan.io/download?type=socks4',
  'https://www.my-proxy.com/free-socks-4-proxy.html',
  'http://www.socks24.org/feeds/posts/default',
  'https://www.freeproxychecker.com/result/socks4_proxies.txt',
  'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks4.txt',
  'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt',
  'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks4.txt',
  'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/SOCKS4.txt',
  'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/SOCKS5.txt',
  'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/socks5.txt',
  'https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt',
  'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/socks5.txt',
  'https://api.openproxylist.xyz/socks5.txt',
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=socks5',
  'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5',
  'https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5', 'timeout',
  'https://api.proxyscrape.com/v2/?request=getproxies&protocol=socks5&timeout=10000&country=all&simplified=true',
  'https://raw.githubusercontent.com/manuGMG/proxy-365/main/SOCKS5.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks5.txt',
  'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks5.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
  'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
  'https://raw.githubusercontent.com/BlackSnowDot/proxylist-update-every-minute/main/socks.txt',
  'http://worm.rip/socks5.txt',
  'http://www.socks24.org/feeds/posts/default',
  'https://www.freeproxychecker.com/result/socks5_proxies.txt',
  'https://www.proxy-list.download/api/v1/get?type=socks5',
  'https://www.proxyscan.io/download?type=socks5',
  'https://www.my-proxy.com/free-socks-5-proxy.html',
  'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt',
  'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/http.txt',
  'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
  'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
  'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
  'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
  'https://api.openproxylist.xyz/http.txt',
  'http://alexa.lr2b.com/proxylist.txt',
  'https://multiproxy.org/txt_all/proxy.txt',
  'https://proxy-spider.com/api/proxies.example.txt',
  'http://proxysearcher.sourceforge.net/Proxy%20List.php?type=http',
  'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/all.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
  'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
  'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
  'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
  'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
  'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
  'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
  'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
  'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
  'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/http.txt',
  'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
  'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/https.txt',
  'https://raw.githubusercontent.com/BlackSnowDot/proxylist-update-every-minute/main/https.txt',
  'https://raw.githubusercontent.com/BlackSnowDot/proxylist-update-every-minute/main/http.txt',
  'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
  'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
  'http://rootjazz.com/proxies/proxies.txt',
  'http://spys.me/proxy.txt',
  'https://sheesh.rip/http.txt',
  'http://worm.rip/http.txt',
  'http://www.proxyserverlist24.top/feeds/posts/default',
  'https://www.proxy-list.download/api/v1/get?type=http',
  'https://www.proxyscan.io/download?type=http',
  'https://www.my-proxy.com/free-anonymous-proxy.html',
  'https://www.my-proxy.com/free-transparent-proxy.html',
  'https://www.my-proxy.com/free-proxy-list.html',
  'https://www.my-proxy.com/free-proxy-list-2.html',
  'https://www.my-proxy.com/free-proxy-list-3.html',
  'https://www.my-proxy.com/free-proxy-list-4.html',
  'https://www.my-proxy.com/free-proxy-list-5.html',
  'https://www.my-proxy.com/free-proxy-list-6.html',
  'https://www.my-proxy.com/free-proxy-list-7.html',
  'https://www.my-proxy.com/free-proxy-list-8.html',
  'https://www.my-proxy.com/free-proxy-list-9.html',
  'https://www.my-proxy.com/free-proxy-list-10.html',
  'https://www.freeproxychecker.com/result/http_proxies.txt',
];

module.exports = TARGET_URLS;