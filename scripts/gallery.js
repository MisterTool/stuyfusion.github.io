function Gallery(parentId, galleryIdPrefix, curPos) {
  this.galleryIdPrefix_ = galleryIdPrefix;
  this.galleryEl_ = document.createElement('div');
  this.galleryEl_.setAttribute('id', this.galleryIdPrefix_ + '-container');
  this.parentId_ = parentId;
  this.parentEl_ = document.getElementById(this.parentId_);
  this.curPos_ = curPos;
  this.images_ = [];
}

Gallery.EPSILON = 0.001;

Gallery.prototype.addImage = function(imageId, imageClass, src) {
  var imageEl = document.createElement('img');
  if (imageId != undefined)
    imageEl.setAttribute('id', imageId);
  if (imageClass != undefined)
    imageEl.setAttribute('class', imageClass);
  imageEl.src = src;
  this.images_.push(imageEl);
}

Gallery.prototype.createButtons = function() {
  var gallery = this;
  var prevBtn = document.createElement('input');
  var nextBtn = document.createElement('input');

  prevBtn.setAttribute('id', this.galleryIdPrefix_ + '-prev');
  nextBtn.setAttribute('id', this.galleryIdPrefix_ + '-next');
  prevBtn.type = 'button';
  nextBtn.type = 'button';
  prevBtn.value = '<';
  nextBtn.value = '>'
  prevBtn.onclick = function() {
    gallery.curPos_ = mod(gallery.curPos_ - 1, gallery.images_.length);
    gallery.update();
  };
  nextBtn.onclick = function() {
    gallery.curPos_ = mod(gallery.curPos_ + 1, gallery.images_.length);
    gallery.update();
  };

  this.galleryEl_.appendChild(prevBtn);
  this.galleryEl_.appendChild(nextBtn);
}

Gallery.prototype.generate = function() {
  this.createButtons();
  this.galleryEl_.appendChild(this.images_[this.curPos_]);
  this.parentEl_.appendChild(this.galleryEl_);
}

Gallery.prototype.update = function() {
  var oldImage = this.galleryEl_.getElementsByTagName('img')[0];
  var newImage = this.images_[this.curPos_];
  var galleryEl = this.galleryEl_;
  galleryEl.appendChild(newImage);
  var timer = setInterval(function() {
    oldImage.style.opacity -= 0.01;
    if (oldImage.style.opacity < Gallery.EPSILON) {
      galleryEl.removeChild(oldImage);
      clearInterval(timer);
    }
  }, 1);
}
