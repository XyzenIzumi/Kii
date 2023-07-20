require("./module")

const cariresep = async (query) => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://resepkoki.id/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const judul = [];
				const upload_date = [];
				const format = [];
				const thumb = [];
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
					jud = $(d).text();
					judul.push(jud)
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: judul[i],
						link: link[i]
					})
				}
				const result = {
					creator: 'KirBotz',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

const bacaresep = async (query) => {
	return new Promise(async (resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const abahan = [];
				const atakaran = [];
				const atahap = [];
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
					bh = $(b).text();
					abahan.push(bh)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
					uk = $(d).text();
					atakaran.push(uk)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
					th = $(f).text();
					atahap.push(th)
				})
				const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
				const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
				const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
				const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
				const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
				tbahan = 'bahan\n'
				for (let i = 0; i < abahan.length; i++) {
					tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
				}
				ttahap = 'tahap\n'
				for (let i = 0; i < atahap.length; i++) {
					ttahap += atahap[i] + '\n\n'
				}
				const tahap = ttahap
				const bahan = tbahan
				const result = {
					creator: 'KirBotz',
					    judul_nya: judul,
						waktu_nya: waktu,
						hasil_nya: hasil,
						tingkat_kesulitan: level,
						thumb_nya: thumb,
						bahan_nya: bahan.split('bahan\n')[1],
						langkah_langkah: tahap.split('tahap\n')[1]
				}
				resolve(result)
			})
			.catch(reject)
	})
}

global.cariresep = cariresep
global.bacaresep = bacaresep