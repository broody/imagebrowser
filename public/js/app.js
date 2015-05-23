var init = function() {
	MainApp.init();
};

var MainApp = {
	init: function() {
		var galleryVm = new this.GalleryVM();
		ko.applyBindings(galleryVm, document.getElementById('gallery'));

		this.getEntries(0, 16, function(data) {
			galleryVm.update(data.data);
		});
		
	},

	getEntries: function(offset, numEntries, callback) {
		this.getData('getEntries/' + offset + '/' + numEntries, function(data) {
			callback(data);
		});
	},

	getData: function(url, callback) {
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			success: function(result, status, xhr) {
				callback(result);
			},
			error: function(err) {
				console.log(err);
			}
		});
	},

	GalleryVM: function() {
		var self = this;
		self.rows = ko.observableArray([]);
		self.NUM_ROWS = 4;
		self.ENTRY_PER_ROW = 4;
		self.update = function(entries) {
			self.rows.removeAll();
			var numRows = Math.ceil(entries.length / self.ENTRY_PER_ROW);
			for(var i=0; i<numRows; i++) {
				var offset = i*self.ENTRY_PER_ROW;
				self.rows.push(new Rows(entries.slice(offset, offset + self.ENTRY_PER_ROW)));
			}
		};
		var Rows = function(entries) {
			this.entries = ko.observableArray([]);
			for(i in entries) {
				this.entries.push(new Entry(entries[i].caption, entries[i].filename));
			}
		};
		var Entry = function(caption, filename) {
			this.caption = ko.observable(caption);
			this.filename = filename;
			this.getSource = function() {
				return "images/thumbnails/" + this.filename;
			};
		};
	}
};

$(document).ready(init);