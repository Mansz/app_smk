var e2pdf = {
    /*
     * e2pdf.helper
     */
    helper: {
        /*
         * e2pdf.helper.color
         */
        color: {
            close: function (el) {
                var color_panel = jQuery(el).parent();
                color_panel.find('.wp-color-result').click();
            }
        },
        /* 
         * e2pdf.helper.image
         */
        image: {
            /*
             * e2pdf.helper.image.load
             */
            load: function (el) {
                el.addClass('e2pdf-loader');
                var value = e2pdf.properties.getValue(el, 'value');
                var image = new Image();
                if (el.data('data-type') === 'e2pdf-qrcode') {
                    value = e2pdf.url.pluginsUrl() + '/img/qrcode.svg';
                } else if (el.data('data-type') === 'e2pdf-barcode') {
                    value = e2pdf.url.pluginsUrl() + '/img/barcode.svg';
                } else if (el.data('data-type') === 'e2pdf-signature') {
                    if (typeof value === 'string' && !value.trim().startsWith("https://") && !value.trim().startsWith("http://")) {
                        value = e2pdf.url.pluginsUrl() + '/img/signature.svg';
                    }
                } else if (el.data('data-type') === 'e2pdf-image') {
                    if (typeof value === 'string' && !value.trim().startsWith("https://") && !value.trim().startsWith("http://")) {
                        value = e2pdf.url.pluginsUrl() + '/img/upload.svg';
                    }
                }

                var children = e2pdf.element.children(el);
                children.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
                image.onload = function ()
                {
                    el.removeClass('e2pdf-loader');
                    if (el.data('data-type') === 'e2pdf-qrcode') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/qrcode.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", true).data('uiResizable')._aspectRatio = true;
                        e2pdf.helper.image.aspectRatio(el, this);
                    } else if (el.data('data-type') === 'e2pdf-barcode') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/barcode.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                    } else if (el.data('data-type') === 'e2pdf-signature') {
                        el.removeClass('e2pdf-aspect-ratio e2pdf-align-left e2pdf-align-center e2pdf-align-bottom e2pdf-valign-left e2pdf-valign-middle e2pdf-valign-bottom');
                        if (value === e2pdf.url.pluginsUrl() + '/img/signature.svg') {
                            children.attr('src', e2pdf.url.pluginsUrl() + '/img/signature.svg').addClass('e2pdf-image-blank');
                            el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                        } else {
                            children.attr('src', value);
                            if (e2pdf.properties.getValue(el, 'dimension') === '1') {
                                el.addClass('e2pdf-aspect-ratio');
                                if (e2pdf.properties.getValue(el, 'horizontal') === 'center') {
                                    el.addClass('e2pdf-align-center');
                                } else if (e2pdf.properties.getValue(el, 'horizontal') === 'right') {
                                    el.addClass('e2pdf-align-right');
                                } else {
                                    el.addClass('e2pdf-align-left');
                                }
                                if (e2pdf.properties.getValue(el, 'vertical') === 'top') {
                                    el.addClass('e2pdf-valign-top');
                                } else if (e2pdf.properties.getValue(el, 'vertical') === 'middle') {
                                    el.addClass('e2pdf-valign-middle');
                                } else {
                                    el.addClass('e2pdf-valign-bottom');
                                }

                                if (e2pdf.properties.getValue(el, 'block_dimension') === '1') {
                                    e2pdf.helper.image.aspectRatio(el, this);
                                    el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = true;
                                } else {
                                    el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                                }

                            } else {
                                el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                            }
                            children.removeClass('e2pdf-image-blank');
                        }
                    } else if (el.data('data-type') === 'e2pdf-image') {
                        el.removeClass('e2pdf-aspect-ratio e2pdf-align-left e2pdf-align-center e2pdf-align-bottom e2pdf-valign-left e2pdf-valign-middle e2pdf-valign-bottom');
                        if (value === e2pdf.url.pluginsUrl() + '/img/upload.svg') {
                            children.attr('src', e2pdf.url.pluginsUrl() + '/img/upload.svg').addClass('e2pdf-image-blank');
                            el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                        } else {
                            children.attr('src', value);
                            if (e2pdf.properties.getValue(el, 'dimension') === '1') {
                                el.addClass('e2pdf-aspect-ratio');
                                if (e2pdf.properties.getValue(el, 'horizontal') === 'center') {
                                    el.addClass('e2pdf-align-center');
                                } else if (e2pdf.properties.getValue(el, 'horizontal') === 'right') {
                                    el.addClass('e2pdf-align-right');
                                } else {
                                    el.addClass('e2pdf-align-left');
                                }
                                if (e2pdf.properties.getValue(el, 'vertical') === 'top') {
                                    el.addClass('e2pdf-valign-top');
                                } else if (e2pdf.properties.getValue(el, 'vertical') === 'middle') {
                                    el.addClass('e2pdf-valign-middle');
                                } else {
                                    el.addClass('e2pdf-valign-bottom');
                                }

                                if (e2pdf.properties.getValue(el, 'block_dimension') === '1') {
                                    e2pdf.helper.image.aspectRatio(el, this);
                                    el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = true;
                                } else {
                                    el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                                }

                            } else {
                                el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                            }
                            children.removeClass('e2pdf-image-blank');
                        }
                    }
                };
                image.onerror = function ()
                {
                    el.removeClass('e2pdf-loader');
                    if (el.data('data-type') === 'e2pdf-qrcode') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/qrcode.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", true).data('uiResizable')._aspectRatio = true;
                    } else if (el.data('data-type') === 'e2pdf-barcode') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/barcode.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                    } else if (el.data('data-type') === 'e2pdf-signature') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/signature.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                    } else if (el.data('data-type') === 'e2pdf-image') {
                        children.attr('src', e2pdf.url.pluginsUrl() + '/img/upload.svg').addClass('e2pdf-image-blank');
                        el.resizable("option", "aspectRatio", false).data('uiResizable')._aspectRatio = false;
                    }
                };
                image.src = value;
            },
            /*
             * e2pdf.helper.image.aspectRatio
             */
            aspectRatio: function (el, img) {

                var padding_top = e2pdf.helper.pxToFloat(el.css('padding-top'));
                var padding_left = e2pdf.helper.pxToFloat(el.css('padding-left'));
                var padding_right = e2pdf.helper.pxToFloat(el.css('padding-right'));
                var padding_bottom = e2pdf.helper.pxToFloat(el.css('padding-bottom'));
                var border_top = e2pdf.helper.pxToFloat(el.css('border-top-width'));
                var border_left = e2pdf.helper.pxToFloat(el.css('border-left-width'));
                var border_right = e2pdf.helper.pxToFloat(el.css('border-right-width'));
                var border_bottom = e2pdf.helper.pxToFloat(el.css('border-bottom-width'));
                var maxWidth = el.width();
                var maxHeight = el.height();
                var ratio = 0;
                var width = img.naturalWidth * 100000;
                var height = img.naturalHeight * 100000;
                if (width > maxWidth) {
                    ratio = maxWidth / width;
                    height = height * ratio;
                    width = width * ratio;
                }
                if (height > maxHeight) {
                    ratio = maxHeight / height;
                    width = width * ratio;
                    height = height * ratio;
                }

                if (e2pdf.properties.getValue(el, 'vertical') === 'middle') {
                    if (el.height() > height) {
                        var top = Math.max(0, (((e2pdf.helper.pxToFloat(el.css('top'))) + (el.height()) / 2)) - (height / 2));
                        e2pdf.properties.set(el, 'top', top);
                        el.css('top', top);
                    }
                } else if (e2pdf.properties.getValue(el, 'vertical') === 'bottom') {
                    if (el.height() > height) {
                        var top = Math.max(0, e2pdf.helper.pxToFloat(el.css('top')) + (el.height() - height));
                        e2pdf.properties.set(el, 'top', top);
                        el.css('top', top);
                    }
                }

                if (e2pdf.properties.getValue(el, 'horizontal') === 'center') {
                    if (el.width() > width) {
                        var left = Math.max(0, (((e2pdf.helper.pxToFloat(el.css('left'))) + (el.width()) / 2)) - (width / 2));
                        e2pdf.properties.set(el, 'left', left);
                        el.css('left', left);
                    }
                } else if (e2pdf.properties.getValue(el, 'horizontal') === 'right') {
                    if (el.width() > width) {
                        var left = Math.max(0, e2pdf.helper.pxToFloat(el.css('left')) + (el.width() - width));
                        e2pdf.properties.set(el, 'left', left);
                        el.css('left', left);
                    }
                }

                e2pdf.properties.set(el, 'width', width + border_left + border_right + padding_left + padding_right);
                e2pdf.properties.set(el, 'height', height + border_top + border_bottom + padding_top + padding_bottom);
                el.width(width);
                el.height(height);
            }
        },
        /*
         * e2pdf.helper.pxToFloat
         */
        pxToFloat: function (value) {
            return parseFloat(value.replace('px', ''));
        },
        /*
         * e2pdf.helper.toHtml()
         */
        toHtml: function (value) {
            var div = document.createElement('div');
            div.innerHTML = value;
            return (div.innerHTML);
        },
        /*
         * e2pdf.helper.sizeToFloat
         */
        sizeToFloat: function (value, width) {
            if (typeof value === 'string' && value.search("%") > 0) {
                return parseFloat(width) * (parseFloat(value.replace('%', '')) / 100);
            } else {
                return parseFloat(value);
            }
        },
        /*
         * e2pdf.helper.ajaxurl
         */
        ajaxurl: function (action) {
            if (action) {
                var url = ajaxurl + '?action=' + action + '&e2pdf_check=true&_nonce=' + e2pdfParams['nonce'];
            } else {
                var url = ajaxurl + '?e2pdf_check=true&_nonce=' + e2pdfParams['nonce'];
            }
            return url;
        }
    },
    /*
     * e2pdf.url
     */
    url: {
        /*
         * e2pdf.url.change
         */
        change: function (page, path) {
            if (window.history && window.history.pushState) {
                var url = window.location.pathname;
                if (page) {
                    url += '?page=' + page;
                }

                if (path) {
                    url += '&' + path;
                }
                history.pushState({urlPath: url}, "", url);
            }
        },
        /*
         * e2pdf.url.build
         */
        build: function (page, path, nonce) {
            var url = window.location.pathname;
            if (page) {
                url += '?page=' + page;
            }
            if (path) {
                url += '&' + path;
            }
            if (nonce) {
                url += '&e2pdf_check=true&_nonce=' + e2pdfParams['nonce'];
            }
            return url;
        },
        /*
         * e2pdf.url.get
         */
        get: function (name, url) {
            if (!url) {
                url = window.location.href;
            }
            if (!name) {
                return url;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
            if (!results) {
                return null;
            }
            if (!results[2]) {
                return '';
            }
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        pluginsUrl: function () {
            return e2pdfParams['plugins_url'];
        },
        uploadUrl: function () {
            return e2pdfParams['upload_url'];
        }
    },
    /*
     * e2pdf.guide
     */
    guide: {
        /*
         * e2pdf.guide.calc
         */
        calc: function (el, pos, w, h, g) {
            if (el != null) {
                if (g) {
                    w = parseFloat(jQuery(el).css('width')) * e2pdf.zoom.zoom;
                    h = parseFloat(jQuery(el).css('height')) * e2pdf.zoom.zoom;
                    pos = jQuery(el).offset();
                    if (jQuery(el).hasClass('e2pdf-page')) {
                        pos = {
                            left: pos.left + 1,
                            top: pos.top + 1
                        };
                    }
                } else {
                    w = parseFloat(jQuery(el).css('width'));
                    h = parseFloat(jQuery(el).css('height'));
                    if (jQuery(el).hasClass('e2pdf-page')) {
                        pos = {
                            left: 0,
                            top: 0
                        };
                    } else {
                        pos = {
                            left: parseFloat(e2pdf.properties.getValue(jQuery(el), 'left')),
                            top: parseFloat(e2pdf.properties.getValue(jQuery(el), 'top'))
                        };
                    }
                }
            }

            return [
                {type: "h", left: pos.left, top: pos.top},
                {type: "h", left: pos.left, top: pos.top + h},
                {type: "v", left: pos.left, top: pos.top},
                {type: "v", left: pos.left + w, top: pos.top},
                {type: "h", left: pos.left, top: pos.top + h / 2},
                {type: "v", left: pos.left + w / 2, top: pos.top}
            ];
        }
    },
    /*
     * e2pdf.bulk
     */
    bulk: {
        /*
         * e2pdf.bulk.progress
         */
        progress: function () {
            setTimeout(function () {
                var data = {};
                data['bulks'] = [];
                jQuery('.e2pdf-bulk[status="pending"],.e2pdf-bulk[status="busy"]').each(function () {
                    data['bulks'].push(jQuery(this).attr('bulk'));
                });
                e2pdf.request.submitRequest('e2pdf_bulk_progress', jQuery(this), data);
                e2pdf.bulk.progress();
            }, 5000);
        }
    },
    /*
     * e2pdf.pdf
     */
    pdf: {
        /*
         * e2pdf.pdf.settings
         */
        settings: {
            options: [],
            /*
             * e2pdf.pdf.settings.change
             */
            change: function (key, value) {
                if (key == 'activated') {
                    jQuery('.e2pdf-post-activated').remove();
                    var activation_link = jQuery('#e2pdf-post-activation > .e2pdf-link');
                    if (value == '1') {
                        if (e2pdf.pdf.settings.get('activated') == '0') {
                            e2pdf.pdf.settings.change('templates_limit', parseInt(e2pdf.pdf.settings.get('templates_limit')) - 1);
                        }
                        if (activation_link.attr('disabled')) {
                            activation_link.html(e2pdfLang['Activated']);
                        } else if (activation_link.hasClass('e2pdf-activate-template')) {
                            activation_link.after(
                                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-post-activated', 'disabled': 'disabled'}).text(' (' + e2pdfLang['Activated'] + ')')
                                    );
                        }
                    } else {
                        if (e2pdf.pdf.settings.get('activated') == '1') {
                            e2pdf.pdf.settings.change('templates_limit', parseInt(e2pdf.pdf.settings.get('templates_limit')) + 1);
                        }

                        if (activation_link.attr('disabled')) {
                            activation_link.html(e2pdfLang['Not Activated']);
                        } else if (activation_link.hasClass('e2pdf-deactivate-template')) {
                            activation_link.after(
                                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-post-activated', 'disabled': 'disabled'}).text(' (' + e2pdfLang['Not Activated'] + ')')
                                    );
                        }
                    }
                }

                e2pdf.pdf.settings.options[key] = value;
                if (jQuery('.e2pdf-form-builder > input[name="' + key + '"]').length > 0) {
                    jQuery('.e2pdf-form-builder > input[name="' + key + '"]').val(value);
                } else {
                    var input = jQuery('<input>',
                            {
                                'type': 'hidden',
                                'name': key,
                                'value': value
                            });
                    jQuery('.e2pdf-form-builder').append(input);
                }

                if (key == 'item') {
                    var data = {};
                    data['extension'] = e2pdf.pdf.settings.get('extension');
                    data['item'] = e2pdf.pdf.settings.get('item');
                    e2pdf.request.submitRequest('e2pdf_get_styles', jQuery('.e2pdf-submit-form'), data);
                }
            },
            /*
             * e2pdf.pdf.settings.set
             */
            set: function (key, value) {
                e2pdf.pdf.settings.options[key] = value;
                if (key == 'item') {
                    var data = {};
                    data['extension'] = e2pdf.pdf.settings.get('extension');
                    data['item'] = e2pdf.pdf.settings.get('item');
                    e2pdf.request.submitRequest('e2pdf_get_styles', jQuery('.e2pdf-submit-form'), data);
                }
            },
            /*
             * e2pdf.pdf.settings.get
             */
            get: function (key) {
                if (typeof e2pdf.pdf.settings.options[key] === 'undefined') {
                    return null;
                } else {
                    return e2pdf.pdf.settings.options[key];
                }
            }
        }
    },
    /*
     * e2pdf.static
     */
    static: {
        /*
         * e2pdf.static.unsaved
         */
        unsaved: false,
        /*
         * e2pdf.static.mediaUploader
         */
        mediaUploader: false,
        /*
         * e2pdf.static.autoloadExport
         */
        autoloadExport: false,
        /*
         * e2pdf.static.selectionRange
         */
        selectionRange: null,

        /*
         * e2pdf.static.observer
         */
        observer: null,
        /*
         * e2pdf.static.vm
         */
        vm: {
            /*
             * e2pdf.static.vm.hidden
             */
            hidden: false,
            /*
             * e2pdf.static.vm.replace
             */
            replace: true,
            /*
             * e2pdf.static.vm.close
             */
            close: true
        },
        /*
         * e2pdf.static.guide
         */
        guide: {
            /*
             * e2pdf.static.guide.guides
             */
            guides: [],
            /*
             * e2pdf.static.guide.distance
             */
            distance: 5,
            x: 0,
            y: 0
        },
        /*
         * e2pdf.static.drag
         */
        drag: {
            /*
             * e2pdf.static.drag.min_top
             */
            min_top: 0,
            /*
             * e2pdf.static.drag.max_top
             */
            max_top: 0,
            /*
             * e2pdf.static.drag.min_left
             */
            min_left: 0,
            /*
             * e2pdf.static.drag.max_left
             */
            max_left: 0,
            /*
             * e2pdf.static.drag.page
             */
            page: null
        }
    },
    /*
     * e2pdf.event
     */
    event: {
        /*
         * e2pdf.event.fire
         */
        fire: function (event, action, el) {
            if (event === 'after.pages.deletePage'
                    || event === 'after.createPdf'
                    || event === 'after.pages.createPage.newpage'
                    || event === 'after.element.create'
                    || event === 'after.element.delete'
                    || event === 'after.settings.style.change'
                    || event === 'after.settings.template.change'
                    || event === 'after.wysiwyg.apply'
                    || event === 'after.request.submitLocal'
                    || event === 'after.mediaUploader.select'
                    || event === 'after.element.moved'
                    || event === 'after.pages.movePage'
                    ) {
                e2pdf.static.unsaved = true;
            }

            if (event === 'before.request.submitForm') {
                e2pdf.static.unsaved = false;
            }

            if (event === 'after.dialog.create' || event === 'after.actions.change') {
                jQuery('.e2pdf-color-picker-load').each(function () {
                    jQuery(this).wpColorPicker(
                            {
                                defaultColor: function () {
                                    if (jQuery(this).attr('data-default')) {
                                        return jQuery(this).attr('data-default');
                                    } else {
                                        return;
                                    }
                                },
                                change: function (event, ui) {
                                    jQuery(this).val(ui.color.toString()).change();
                                }
                            }
                    ).removeClass('e2pdf-color-picker-load');
                });
            }

            if (event === 'after.pages.deletePage'
                    || event === 'after.pages.createPage.newpage') {
                jQuery('#e2pdf-zoom').trigger('change');
            }

            if (event === 'before.request.submitRequest') {
                el.attr('disabled', 'disabled');
                if (action === 'e2pdf_auto') {
                    el.closest('form').find('.e2pdf-submit, #e2pdf-extension, #e2pdf-item, #e2pdf-item1, #e2pdf-item2').attr('disabled', 'disabled');
                }
                if (action === 'e2pdf_extension') {
                    el.closest('form').find('.e2pdf-create-pdf, #e2pdf-item, #e2pdf-item1, #e2pdf-item2, #auto_form_label').attr('disabled', 'disabled');
                }

                if (action === 'e2pdf_templates') {
                    jQuery('.e2pdf-export-options, .e2pdf-export-item').hide();
                    jQuery('#e2pdf-export-template-actions').empty();
                    jQuery('.e2pdf-export-form-submit, .e2pdf-export-dataset').attr('disabled', 'disabled');
                    jQuery('.e2pdf-export-dataset').data('options', []).empty();
                    jQuery('.e2pdf-export-dataset-search').val('');
                    jQuery('.e2pdf-export-dataset-actions').empty();
                }

                if (action === 'e2pdf_dataset') {
                    jQuery('.e2pdf-dataset-shortcode-wr').hide();
                    jQuery('.e2pdf-export-form-submit, .e2pdf-export-dataset').attr('disabled', 'disabled');
                    el.closest('.e2pdf-export-item').find('.e2pdf-export-dataset-actions').empty();
                }

                if (action === 'e2pdf_delete_item') {
                    el.closest('.e2pdf-export-item').find('.e2pdf-export-dataset').attr('disabled', 'disabled');
                }

                if (action == 'e2pdf_delete_items') {
                    jQuery('.e2pdf-export-dataset').attr('disabled', 'disabled');
                }
            }

            if (event === 'after.request.submitRequest.error' || event === 'after.request.submitRequest.success') {
                if (action !== 'e2pdf_deactivate_all_templates') {
                    el.attr('disabled', false);
                }
                if (action === 'e2pdf_auto') {
                    el.closest('form').find('.e2pdf-submit, #e2pdf-extension, #e2pdf-item, #e2pdf-item1, #e2pdf-item2').attr('disabled', false);
                }
                if (action === 'e2pdf_extension') {
                    el.closest('form').find('#e2pdf-item, #e2pdf-item1, #e2pdf-item2').find('option').remove();
                    el.closest('form').find('.e2pdf-create-pdf, #e2pdf-item, #e2pdf-item1, #e2pdf-item2, #auto_form_label').attr('disabled', false);
                }
                if (action === 'e2pdf_get_styles') {
                    jQuery('link[id^="e2pdf-dynamic-style-"]').remove();
                    jQuery('script[id^="e2pdf-dynamic-script-"]').remove();
                }

                if (action === 'e2pdf_delete_item') {
                    el.closest('.e2pdf-export-item').find('.e2pdf-export-dataset').attr('disabled', false);
                }

                if (action == 'e2pdf_delete_items') {
                    jQuery('.e2pdf-export-dataset').attr('disabled', false);
                }

            }

            if (event === 'before.request.upload') {
                el.closest('form').find('.e2pdf-submit, #e2pdf-extension, #e2pdf-item, #e2pdf-item1, #e2pdf-item2, #auto_form_label').attr('disabled', 'disabled');
            }

            if (event === 'after.request.upload.error' || event === 'after.request.upload.success') {
                el.closest('form').find('.e2pdf-submit, #e2pdf-extension, #e2pdf-item, #e2pdf-item1, #e2pdf-item2, #auto_form_label').attr('disabled', false);
                el.closest('form').find('#e2pdf-upload-pdf').replaceWith(
                        jQuery('<input>', {'id': 'e2pdf-upload-pdf', 'type': 'file', 'name': 'pdf', 'class': 'e2pdf-upload-pdf e2pdf-hide'})
                        );
                el.closest('form').find('#e2pdf-reupload-pdf').replaceWith(
                        jQuery('<input>', {'id': 'e2pdf-reupload-pdf', 'type': 'file', 'name': 'pdf', 'class': 'e2pdf-reupload-pdf e2pdf-hide'})
                        );
            }
        }
    },
    /*
     * e2pdf.form
     */
    form: {
        /*
         * e2pdf.form.serializeObject
         */
        serializeObject: function (form) {

            var o = {};
            var a = form.serializeArray();
            jQuery.each(a, function () {
                if (this.name.endsWith('[]')) {

                    var name = this.name;
                    name = name.substring(0, this.name.length - 2);
                    if (!(name in o)) {
                        o[name] = [];
                    }
                    o[name].push(this.value);
                } else if (this.name.endsWith(']')) {

                    var name = this.name;
                    var path = name.split(/[\[\]]+/);
                    var curItem = o;
                    for (var j = 0; j < path.length - 2; j++)
                    {
                        if (!(path[j] in curItem))
                        {
                            curItem[path[j]] = {};
                        }
                        curItem = curItem[path[j]];
                    }

                    curItem[path[j]] = this.value || '';
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        /*
         * e2pdf.form.serializeElements
         */
        serializeElements: function () {
            var o = {};
            jQuery('.e2pdf-element').each(
                    function (index) {
                        var el = {};
                        el.type = jQuery(this).data('data-type');
                        el.properties = e2pdf.properties.get(jQuery(this), true);
                        el.actions = e2pdf.actions.get(jQuery(this));
                        el.top = jQuery(this).css('top');
                        el.left = jQuery(this).css('left');
                        el.width = jQuery(this).css('width');
                        el.height = jQuery(this).css('height');
                        if (jQuery(this).data('data-type') == 'e2pdf-html') {
                            if (e2pdf.properties.getValue(jQuery(this), 'wysiwyg_disable') == '1') {
                                el.value = jQuery(this).find('.e2pdf-html').val();
                            } else {
                                el.value = jQuery(this).find('.e2pdf-html').html();
                            }
                        } else if (jQuery(this).data('data-type') == 'e2pdf-page-number') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-input') {
                            el.value = jQuery(this).find('.e2pdf-input').val();
                        } else if (jQuery(this).data('data-type') == 'e2pdf-textarea') {
                            el.value = jQuery(this).find('.e2pdf-textarea').val();
                        } else if (jQuery(this).data('data-type') == 'e2pdf-checkbox') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-radio') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-select') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-image') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-qrcode') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-barcode') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-link') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else if (jQuery(this).data('data-type') == 'e2pdf-signature') {
                            el.value = e2pdf.properties.getValue(jQuery(this), 'value');
                        } else {
                            el.value = jQuery(this).html();
                        }
                        el.name = e2pdf.properties.getValue(jQuery(this), 'name');
                        el.page_id = jQuery(this).closest('.e2pdf-page').attr('data-page_id');
                        el.element_id = jQuery(this).attr('data-element_id');
                        o[index] = el;
                    });
            return o;
        }
    },
    /*
     * e2pdf.font
     */
    font: {
        /*
         * e2pdf.font.load
         */
        load: function (el) {
            if (el.is('select')) {
                var name = el.val();
                var value = el.find('option:selected').attr('path');
            } else if (el.is('div')) {
                var name = el.attr('name');
                var value = el.attr('path');
            }

            if (jQuery("head").find('style[name="' + name + '"]').length === 0) {
                jQuery("head").append("<style name='" + name + "' type='text/css'>@font-face {font-family: " + name + "; src: url('" + e2pdf.url.uploadUrl() + "/fonts/" + value + "')}</style>");
            }
        },
        /*
         * e2pdf.font.apply
         */
        apply: function (el, font) {
            var font_name = font.find('option:selected').html();
            if (font_name) {
                el.css('font-family', font_name);
            } else {
                el.css('font-family', '');
            }
        },
        /*
         * e2pdf.font.size
         */
        size: function (el, size) {
            var font_size = size.val();
            el.css({'font-size': font_size + "px"});
        },
        /*
         * e2pdf.font.line
         */
        line: function (el, height) {
            var line_height = height.val();
            el.css({'line-height': line_height + "px"});
        },
        /*
         * e2pdf.font.color
         */
        fontcolor: function (el, color) {
            var font_color = color.val();
            el.css({'color': font_color});
        },
        /*
         * e2pdf.font.delete
         */
        delete: function (el) {
            var font = el.attr('data-font');
            e2pdf.request.submitRequest('e2pdf_delete_font', el, font);
        }
    },
    /*
     * e2pdf.request
     */
    request: {
        /*
         * e2pdf.request.upload
         */
        upload: function (action, el) {
            if (el.attr('disabled')) {
                return;
            }

            var data = new FormData(el.closest('form')[0]);
            e2pdf.event.fire('before.request.upload', action, el);
            var loader = el.closest('form').find('.e2pdf-form-loader .spinner');
            loader.css('visibility', 'visible').fadeIn();
            jQuery.ajax({
                url: e2pdf.helper.ajaxurl(action),
                type: 'POST',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    loader.css('visibility', 'hidden').fadeOut();
                    e2pdf.event.fire('after.request.upload.success', action, el);
                    if (response.redirect !== undefined) {
                        e2pdf.static.unsaved = false;
                        location.href = response.redirect;
                    } else if (response.error !== undefined) {
                        alert(response.error);
                    } else if (response.content) {
                        e2pdf.request.callBack(action, response.content);
                    }
                },
                error: function (response) {
                    loader.css('visibility', 'hidden').fadeOut();
                    e2pdf.event.fire('after.request.upload.success', action, el);
                }
            });
        },
        /*
         * e2pdf.request.submitForm
         */
        submitForm: function (el) {
            if (el.attr('disabled')) {
                return;
            }
            el.attr('disabled', 'disabled');
            var loader = el.closest('form').find('.e2pdf-form-loader .spinner');
            loader.css('visibility', 'visible').fadeIn();
            e2pdf.event.fire('before.request.submitForm');
            var form_id = el.attr('form-id');
            var form = jQuery(document.getElementById(form_id));
            var data = e2pdf.form.serializeObject(form);
            if (form_id === 'e2pdf-build-form') {
                var elements = e2pdf.form.serializeElements();
                data.pages = {};
                jQuery('.e2pdf-page').each(function () {
                    var page_id = jQuery(this).attr('data-page_id');
                    data.pages[page_id] = {};
                    var properties = e2pdf.properties.get(jQuery(this), true);
                    var page_elements = [];
                    data.pages[page_id]['properties'] = properties;
                    data.pages[page_id]['actions'] = e2pdf.actions.get(jQuery(this));
                    data.pages[page_id]['elements'] = page_elements;
                });
                for (var key in elements) {
                    data.pages[elements[key].page_id]['elements'].push(elements[key]);
                }
                data.actions = e2pdf.actions.get(jQuery('#e2pdf-tpl'));
                data = JSON.stringify(data);
            }

            if (form_id === 'e2pdf-export-form') {
                data = JSON.stringify(data);
            }

            if (form_id === 'e2pdf-email') {

                jQuery('.e2pdf-email-lock .e2pdf-form-loader').removeClass('e2pdf-hidden-loader');
                data = {};
                data['email'] = form.find('input[name="email"]').val();
                if (form.find('input[name="email_code"]').length > 0) {
                    data['email_code'] = form.find('input[name="email_code"]').val();
                }
            }

            var action = el.attr('action');
            el.parent().find('.spinner').css('visibility', 'visible').fadeIn();
            if (el.attr('target') === '_blank') {
                var post_form = jQuery('<form>', {'target': '_blank', 'method': 'POST', 'action': el.attr('href')}).append(
                        jQuery('<textarea>', {'name': 'preview'}).val(data)
                        ).hide();
                jQuery('body').append(post_form);
                post_form.submit();
                post_form.remove();
                el.parent().find('.spinner').css('visibility', 'hidden').fadeOut();
                loader.css('visibility', 'hidden').fadeOut();
                el.attr('disabled', false);
                return false;
            }

            jQuery.ajax({
                type: 'POST', url: e2pdf.helper.ajaxurl(),
                data: {action: action, data: data},
                success: function (response) {
                    if (response.redirect !== undefined) {
                        location.href = response.redirect;
                    } else {
                        el.parent().find('.spinner').css('visibility', 'hidden').fadeOut();
                        loader.css('visibility', 'hidden').fadeOut();
                        el.attr('disabled', false);
                        if (response.error !== undefined) {
                            alert(response.error);
                        } else if (response.content) {
                            e2pdf.request.callBack(action, response.content, el);
                        }
                    }
                },
                error: function (response) {
                    el.parent().find('.spinner').css('visibility', 'hidden').fadeOut();
                    loader.css('visibility', 'hidden').fadeOut();
                    el.attr('disabled', false);
                }
            });
        },
        /*
         * e2pdf.request.submitRequest
         */
        submitRequest: function (action, el, value) {
            if (el.attr('disabled')) {
                return;
            }

            var loader = el.closest('form').find('.e2pdf-form-loader .spinner');
            if (!value) {
                var value = el.val();
            }
            loader.css('visibility', 'visible').fadeIn();
            e2pdf.event.fire('before.request.submitRequest', action, el);
            jQuery.ajax({
                type: 'POST', url: e2pdf.helper.ajaxurl(),
                data: {action: action, data: value},
                success: function (response) {
                    loader.css('visibility', 'hidden').fadeOut();
                    e2pdf.event.fire('after.request.submitRequest.success', action, el);
                    if (response.redirect !== undefined) {
                        location.href = response.redirect;
                    } else if (response.error !== undefined) {
                        alert(response.error);
                    } else if (response.content) {
                        e2pdf.request.callBack(action, response.content, el);
                    }
                },
                error: function (response) {
                    loader.css('visibility', 'hidden').fadeOut();
                    e2pdf.event.fire('after.request.submitRequest.error', action, el);
                }
            });
        },
        /*
         * e2pdf.request.submitLocal
         */
        submitLocal: function (el) {
            var form_id = el.attr('form-id');
            var form = jQuery(document.getElementById(form_id));
            var data = e2pdf.form.serializeObject(form);
            if (form_id === 'e2pdf-page-options') {
                var width = data['width'];
                var height = data['height'];
                var page = jQuery('.e2pdf-page[data-page_id="' + data['page_id'] + '"]');
                e2pdf.actions.apply(page, data['actions']);
                e2pdf.pages.changePageSize(page, width, height);
                e2pdf.properties.apply(page, data);
                e2pdf.event.fire('after.request.submitLocal', false, page);
            } else if (form_id === 'e2pdf-tpl-actions') {
                e2pdf.actions.apply(jQuery('#e2pdf-tpl'), data['actions']);
            } else {
                var element = jQuery(".e2pdf-element[data-element_id='" + data.element_id + "']").first();
                e2pdf.actions.apply(element, data['actions']);
                delete data['actions'];
                e2pdf.properties.apply(element, data);
                e2pdf.properties.render(element);
                e2pdf.event.fire('after.request.submitLocal', false, el);
            }

            e2pdf.dialog.close();
        },
        /*
         * e2pdf.request.callBack
         */
        callBack: function (action, result, el) {
            if (action === 'e2pdf_email') {
                if (result === 'subscribed') {
                    jQuery('.e2pdf-email-lock').remove();
                } else {
                    jQuery('.e2pdf-email-lock .e2pdf-form-loader').addClass('e2pdf-hidden-loader');
                    var form_id = el.attr('form-id');
                    var form = jQuery(document.getElementById(form_id));
                    form.find('label').html(e2pdfLang['Confirmation Code'] + ":");
                    form.find('input[name="email"]').attr('type', 'hidden');
                    jQuery('<input>', {'type': 'text', 'name': 'email_code', 'class': 'e2pdf-w100', 'placeholder': e2pdfLang['Code']}).insertAfter(form.find('input[name="email"]'));
                }
            }

            if (action === 'e2pdf_extension') {
                for (var key in result) {
                    var option = jQuery('<option>',
                            {
                                'value': result[key]['id']
                            }).html(result[key]['name']);
                    if (e2pdf.pdf.settings.get('item') === result[key]['id']) {
                        option.attr('selected', 'selected');
                    }
                    option.data('data-item', result[key]);
                    jQuery('#e2pdf-item').append(option);
                }

                for (var key in result) {
                    if (result[key]['id'] != '-1' && result[key]['id'] != '-2') {
                        var option = jQuery('<option>',
                                {
                                    'value': result[key]['id']
                                }).html(result[key]['name']);
                        if (e2pdf.pdf.settings.get('item1') === result[key]['id']) {
                            option.attr('selected', 'selected');
                        }
                        option.data('data-item', result[key]);
                        jQuery('#e2pdf-item1').append(option);
                    }
                }

                for (var key in result) {
                    if (result[key]['id'] != '-1' && result[key]['id'] != '-2') {
                        var option = jQuery('<option>',
                                {
                                    'value': result[key]['id']
                                }).html(result[key]['name']);
                        if (e2pdf.pdf.settings.get('item2') === result[key]['id']) {
                            option.attr('selected', 'selected');
                        }
                        option.data('data-item', result[key]);
                        jQuery('#e2pdf-item2').append(option);
                    }
                }

                el.closest('form').find('#e2pdf-item').trigger('change');
            }

            if (action === 'e2pdf_get_styles') {
                for (var key in result) {
                    if (result[key].split('.').pop() == 'js') {
                        jQuery('<script>', {'id': 'e2pdf-dynamic-script-' + key + '-js', 'type': 'text/javascript', 'href': result[key]}).appendTo('head');
                    } else {
                        jQuery('<link>', {'id': 'e2pdf-dynamic-style-' + key + '-css', 'type': 'text/css', 'rel': 'stylesheet', 'href': result[key]}).appendTo('head');
                    }
                }
            }
            if (action === 'e2pdf_visual_mapper') {
                el.html(result);
                var height = el.outerHeight();
                e2pdf.visual.mapper.markup();
                if (window.ResizeObserver) {
                    e2pdf.static.observer = new ResizeObserver((mutationsList, observer) => {
                        for (var mutation of mutationsList) {
                            if (el.outerHeight() != height) {
                                e2pdf.visual.mapper.rebuild();
                            }
                        }
                    });
                    e2pdf.static.observer.observe(el[0]);
                }

                var images = el.find('img');
                var counter = 0;
                counter = images.length;
                images.each(function () {
                    var img = new Image();
                    img.onload = function () {
                        counter--;
                        if (counter === 0) {
                            e2pdf.visual.mapper.rebuild();
                        }
                    };
                    img.onerror = function () {
                        counter--;
                        if (counter === 0) {
                            e2pdf.visual.mapper.rebuild();
                        }
                    };
                    img.src = jQuery(this).attr('src');
                });
            }
            if (action === 'e2pdf_templates') {
                var template_id = result['id'];
                if (template_id) {
                    jQuery('#e2pdf-template-shortcode').val('[e2pdf-download id="' + template_id + '"]');
                    for (var key in result['datasets']) {
                        var options = [];
                        var dataset_field = jQuery('.e2pdf-export-dataset[name="' + key + '"]');
                        var search_field = jQuery('.e2pdf-export-dataset-search[field="' + key + '"]');
                        dataset_field.closest('.e2pdf-export-item').show();
                        for (var subkey in result['datasets'][key]) {
                            var option = {
                                key: result['datasets'][key][subkey]['key'].toString(),
                                value: result['datasets'][key][subkey]['value'].toString()
                            };
                            options.push(option);
                            if (e2pdf.url.get('action') == 'bulk') {
                                dataset_field.append(jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(jQuery('<label>').html(option.value).prepend(jQuery('<input>', {'name': key + '[]', 'type': 'checkbox', 'value': option.key}))));
                            } else {
                                dataset_field.append(jQuery('<option>', {'value': option.key}).html(option.value));
                            }
                        }
                        dataset_field.data('options', options);
                        if (e2pdf.url.get('action') !== 'bulk') {
                            dataset_field.val('');
                        }
                        if (Object.keys(result['datasets'][key]).length > 1) {
                            dataset_field.attr('disabled', false);
                            search_field.attr('disabled', false);
                            if (e2pdf.url.get('action') == 'bulk') {
                                dataset_field.find('input[type="checkbox"][value=""]').prop('checked', true).trigger('change');
                            }
                        }
                    }

                    if (result['actions']) {
                        var ul = jQuery('<ul>', {'class': 'e2pdf-inline-links'});
                        for (var key in result['actions']) {
                            ul.append(jQuery('<li>').html(result['actions'][key]));
                        }
                        jQuery('#e2pdf-export-template-actions').append(ul);
                    }

                    jQuery('.e2pdf-export-option').each(function () {
                        var key = jQuery(this).attr('name').replace('options[', '').replace(']', '');
                        if (result['options'][key]) {
                            jQuery(this).val(result['options'][key]);
                        } else {
                            if (e2pdf.url.get('action') == 'bulk' && key == 'name') {
                                jQuery(this).val('[e2pdf-dataset]');
                            } else {
                                jQuery(this).val('');
                            }
                        }
                    });
                    if (e2pdf.static.autoloadExport) {
                        var datasets = [
                            'dataset',
                            'dataset2'
                        ];
                        for (var key in datasets) {
                            if (e2pdf.url.get(datasets[key]) && jQuery('.e2pdf-export-dataset[name="' + datasets[key] + '"]').find('option[value="' + e2pdf.url.get(datasets[key]) + '"]').length > 0) {
                                jQuery('.e2pdf-export-dataset[name="' + datasets[key] + '"]').val(e2pdf.url.get(datasets[key]));
                            }
                        }
                        jQuery('.e2pdf-export-dataset').first().change();
                        e2pdf.static.autoloadExport = false;
                    } else {
                        var url = '';
                        if (e2pdf.url.get('action')) {
                            url += 'action=' + e2pdf.url.get('action') + '&';
                        }
                        url += 'id=' + template_id;
                        e2pdf.url.change('e2pdf', url);
                    }

                    if (e2pdf.url.get('action') == 'bulk') {
                        jQuery('.e2pdf-export-form').attr('action', e2pdf.url.build('e2pdf', 'action=bulk&id=' + template_id));
                    }
                    jQuery('.e2pdf-export-options').slideDown();
                } else {
                    if (e2pdf.url.get('action') == 'bulk') {
                        e2pdf.url.change('e2pdf', 'action=bulk');
                    } else {
                        e2pdf.url.change('e2pdf');
                    }
                }
            }

            if (action === 'e2pdf_dataset') {
                var template_id = result['id'];
                var url = 'id=' + template_id;
                var shortcode = '[e2pdf-download id="' + template_id + '"';
                if (result['datasets']) {
                    for (var key in result['datasets']) {
                        var dataset = jQuery('.e2pdf-export-dataset[name="' + key + '"]');
                        var actions = dataset.closest('.e2pdf-export-item').find('.e2pdf-export-dataset-actions');
                        dataset.attr('disabled', false);
                        if (result['datasets'][key]['id'] == '') {
                            dataset.val('');
                        } else {
                            url += '&' + key + '=' + result['datasets'][key]['id'];
                            shortcode += ' ' + key + '="' + result['datasets'][key]['id'] + '"';
                        }

                        if (result['datasets'][key]['actions']) {
                            var ul = jQuery('<ul>', {'class': 'e2pdf-inline-links'});
                            for (var dkey in result['datasets'][key]['actions']) {
                                ul.append(jQuery('<li>').html(result['datasets'][key]['actions'][dkey]));
                            }
                            actions.empty().append(ul);
                        }
                    }
                    jQuery('.e2pdf-export-form').attr('action', e2pdf.url.build('e2pdf', 'action=export&' + url));
                }
                shortcode += "]";
                if (result['export']) {
                    jQuery('.e2pdf-dataset-shortcode-wr').show();
                    jQuery('.e2pdf-dataset-shortcode').val(shortcode);
                    jQuery('.e2pdf-export-form-submit').attr('disabled', false);
                }
                e2pdf.url.change('e2pdf', url);
            }

            if (action === 'e2pdf_delete_item' || action === 'e2pdf_delete_items') {
                jQuery('.e2pdf-export-template').trigger('change');
            }

            if (action === 'e2pdf_activate_template' || action === 'e2pdf_deactivate_template') {
                if (action === 'e2pdf_activate_template') {
                    el.removeClass('e2pdf-activate-template e2pdf-color-red').addClass('e2pdf-deactivate-template e2pdf-color-green').text(e2pdfLang['Activated']);
                    if (el.parent().attr('id') == 'e2pdf-post-activation') {
                        e2pdf.pdf.settings.change('activated', '1');
                    }
                } else {
                    el.removeClass('e2pdf-deactivate-template e2pdf-color-green').addClass('e2pdf-activate-template e2pdf-color-red').text(e2pdfLang['Not Activated']);
                    if (el.parent().attr('id') == 'e2pdf-post-activation') {
                        e2pdf.pdf.settings.change('activated', '0');
                    }
                }
            }

            if (action === 'e2pdf_auto') {
                var elements = result.elements;
                var width = parseFloat(e2pdf.pdf.settings.get('width'));
                var height = parseFloat(e2pdf.pdf.settings.get('height'));
                e2pdf.pages.changeTplSize(width, height);
                e2pdf.pages.createPage();
                jQuery('.ui-dialog-content').dialog('close');
                var i = 1;
                var page = jQuery('.e2pdf-page').last();
                var auto = {
                    'block': {
                        'top': 0,
                        'left': 0,
                        'right': 0,
                        'bottom': 0,
                        'width': 0,
                        'page': page.attr('data-page_id')
                    },
                    'element': {
                        'top': 0,
                        'left': 0,
                        'right': 0,
                        'bottom': 0,
                        'width': 0,
                        'properties': {}
                    },
                    page: {
                        'top': typeof result.page.top !== 'undefined' ? parseFloat(result.page.top) : 0,
                        'left': typeof result.page.left !== 'undefined' ? parseFloat(result.page.left) : 0,
                        'right': typeof result.page.right !== 'undefined' ? parseFloat(result.page.right) : 0,
                        'bottom': typeof result.page.bottom !== 'undefined' ? parseFloat(result.page.bottom) : 0
                    }
                };
                for (var key in elements) {
                    var element = elements[key];
                    var type = element.type;
                    var properties = {};
                    element['properties'] = typeof element.properties === 'undefined' ? {} : element.properties;
                    element['block'] = typeof element.block === 'undefined' ? false : element.block;
                    element['float'] = typeof element.float === 'undefined' ? false : element.float;
                    element.properties['width'] = typeof element.properties.width === 'undefined' ? 0 : element.properties.width;
                    element.properties['height'] = typeof element.properties.height === 'undefined' ? 0 : element.properties.height;
                    element.properties['top'] = typeof element.properties.top === 'undefined' ? 0 : element.properties.top;
                    element.properties['left'] = typeof element.properties.left === 'undefined' ? 0 : element.properties.left;
                    element.properties['right'] = typeof element.properties.right === 'undefined' ? 0 : element.properties.right;
                    for (var property in element.properties) {
                        properties[property] = element.properties[property];
                    }

                    if (element.block) {
                        properties['width'] = Math.floor(e2pdf.helper.sizeToFloat(element.properties.width, width) - parseFloat(element.properties.left) - parseFloat(element.properties.right));
                    }

                    if (element.block) {
                        if (element.float && auto.block.width > 0 && (auto.block.right + Math.floor(e2pdf.helper.sizeToFloat(properties.width, width) - parseFloat(properties.left) - parseFloat(properties.right)) <= width - auto.page.right)) {
                            page = jQuery('.e2pdf-page[data-page_id="' + auto.block.page + '"]');
                            properties['left'] = auto.block.right + parseFloat(properties.left);
                            properties['top'] = auto.block.top;
                        } else {
                            page = jQuery('.e2pdf-page').last();
                            auto.block['bottom'] = 0;
                            page.find('.e2pdf-element').each(function () {
                                auto.block['bottom'] = Math.max(auto.block['bottom'], e2pdf.properties.getValue(jQuery(this), 'top') + e2pdf.properties.getValue(jQuery(this), 'height'));
                            });
                            properties['left'] = parseFloat(properties.left);
                            properties['top'] = auto.block.bottom + parseFloat(properties.top);
                        }
                    } else {
                        if (element.float) {
                            if (element.properties.width !== 'auto') {
                                properties['width'] = Math.floor(e2pdf.helper.sizeToFloat(properties.width, auto.block.width) - e2pdf.helper.sizeToFloat(properties.left, auto.block.width) - e2pdf.helper.sizeToFloat(properties.right, auto.block.width));
                                if (auto.element.properties.width === 'auto') {
                                    properties['width'] = properties['width'] - auto.element.width;
                                }
                            }
                            properties['left'] = auto.element.right + e2pdf.helper.sizeToFloat(properties.left, auto.block.width);
                            properties['top'] = auto.element.top;
                        } else {
                            if (element.properties.width !== 'auto') {
                                properties['width'] = Math.floor(e2pdf.helper.sizeToFloat(properties.width, auto.block.width) - e2pdf.helper.sizeToFloat(properties.left, auto.block.width) - e2pdf.helper.sizeToFloat(properties.right, auto.block.width));
                            }
                            properties['left'] = auto.block.left + e2pdf.helper.sizeToFloat(properties.left, auto.block.width);
                            properties['top'] = auto.block.bottom + parseFloat(properties.top);
                        }
                    }

                    var obj = e2pdf.element.create(type, page, properties, false, true);
                    e2pdf.properties.render(obj);
                    page.append(obj);
                    if (typeof element.actions !== 'undefined' && Object.keys(element.actions).length !== 0) {
                        e2pdf.actions.apply(obj, element.actions);
                    }

                    if (element.properties.height === 'auto') {
                        e2pdf.properties.set(obj, 'height', obj.height());
                        e2pdf.properties.render(obj);
                    } else if (element.properties.height === 'max') {
                        e2pdf.properties.set(obj, 'height', height - auto.page.bottom - e2pdf.properties.getValue(obj, 'top'));
                        e2pdf.properties.render(obj);
                    }

                    if (!element.block
                            && element.float
                            && auto.block.width > 0
                            && e2pdf.properties.getValue(obj, 'left') + e2pdf.properties.getValue(obj, 'width') > auto.block.left + auto.block.width) {
                        e2pdf.properties.set(obj, 'left', auto.block.left);
                        e2pdf.properties.set(obj, 'top', auto.element.bottom + 1);
                        e2pdf.properties.render(obj);
                    }

                    if (e2pdf.properties.getValue(obj, 'top') + e2pdf.properties.getValue(obj, 'height') + auto.page.bottom > height) {
                        if (page.is(':last-child')) {
                            if (e2pdfParams['license_type'] == 'FREE') {
                                obj.remove();
                                alert(e2pdfLang['Only 1 page allowed with "FREE" license type']);
                                return;
                            }

                            if (page.find('.e2pdf-element').not(obj).length > 0) {
                                e2pdf.pages.createPage();
                                page = jQuery('.e2pdf-page').last();
                            }
                        } else {
                            if (page.find('.e2pdf-element').not(obj).length > 0) {
                                page = page.next('.e2pdf-page');
                            }
                        }

                        e2pdf.element.delete(obj);
                        if (element.properties.height === 'auto') {
                            properties['height'] = element.properties.height;
                        }

                        auto.block['bottom'] = auto.page.top;
                        properties['top'] = auto.block.bottom;
                        obj = e2pdf.element.create(type, page, properties, false, true);
                        e2pdf.properties.render(obj);
                        page.append(obj);
                        if (element.properties.height === 'auto') {
                            e2pdf.properties.set(obj, 'height', obj.height());
                            e2pdf.properties.render(obj);
                        }

                        if (e2pdf.properties.getValue(obj, 'top') + e2pdf.properties.getValue(obj, 'height') + auto.page.bottom > height) {
                            e2pdf.properties.set(obj, 'height', height - e2pdf.properties.getValue(obj, 'top') - auto.page.bottom);
                            e2pdf.properties.render(obj);
                            e2pdf.properties.set(obj, 'top', properties['top']);
                            e2pdf.properties.render(obj);
                        }
                    }

                    auto.element = {
                        'top': e2pdf.properties.getValue(obj, 'top'),
                        'left': e2pdf.properties.getValue(obj, 'left'),
                        'right': e2pdf.properties.getValue(obj, 'left') + e2pdf.properties.getValue(obj, 'width') + e2pdf.helper.sizeToFloat(properties.right, auto.block.width),
                        'bottom': e2pdf.properties.getValue(obj, 'top') + e2pdf.properties.getValue(obj, 'height'),
                        'width': e2pdf.properties.getValue(obj, 'width'),
                        'properties': element.properties
                    };
                    if (element.block) {
                        auto.block = {
                            'top': e2pdf.properties.getValue(obj, 'top'),
                            'left': e2pdf.properties.getValue(obj, 'left'),
                            'right': e2pdf.properties.getValue(obj, 'left') + e2pdf.properties.getValue(obj, 'width') + parseFloat(properties.right),
                            'bottom': e2pdf.properties.getValue(obj, 'top') + e2pdf.properties.getValue(obj, 'height'),
                            'width': e2pdf.properties.getValue(obj, 'width'),
                            'page': page.attr('data-page_id')
                        };
                    } else {
                        auto.block['bottom'] = e2pdf.properties.getValue(obj, 'top') + e2pdf.properties.getValue(obj, 'height');
                    }
                    i++;
                }
            }

            if (action === 'e2pdf_bulk_action') {
                if (result.action == 'delete') {
                    el.closest('.e2pdf-bulk').remove();
                    if (jQuery('.e2pdf-bulks-list .e2pdf-bulk').length == 0) {
                        jQuery('.e2pdf-bulks-list').remove();
                    }
                } else if (result.action == 'stop' && el.closest('.e2pdf-bulk').attr('status') != 'completed') {
                    el.closest('.e2pdf-bulk').attr('status', 'stop');
                    el.attr('action', 'start').html(jQuery('<i>', {'class': 'dashicons dashicons-controls-play'}));
                } else if (result.action == 'start' && el.closest('.e2pdf-bulk').attr('status') != 'completed') {
                    el.closest('.e2pdf-bulk').attr('status', 'pending');
                    el.attr('action', 'stop').html(jQuery('<i>', {'class': 'dashicons dashicons-controls-pause'}));
                }
            }

            if (action === 'e2pdf_bulk_progress') {
                for (var key in result.bulks) {
                    var bulk = result.bulks[key];
                    jQuery('.e2pdf-bulk[bulk="' + bulk['ID'] + '"]').find('.e2pdf-bulk-count').html(bulk['count']);
                    if (bulk['status'] == 'completed') {
                        jQuery('.e2pdf-bulk[bulk="' + bulk['ID'] + '"]').attr('status', 'completed');
                        jQuery('.e2pdf-bulk[bulk="' + bulk['ID'] + '"]').find('.e2pdf-bulk-action:not([action="delete"])').replaceWith(
                                jQuery('<a>', {'class': 'e2pdf-link', 'href': e2pdf.url.build('e2pdf', 'action=bulk&uid=' + bulk['uid'])}).append(
                                jQuery('<i>', {'class': 'dashicons dashicons-download'})
                                ));
                    }
                }
            }
        }
    },
    /*
     * e2pdf.dialog
     */
    dialog: {
        /*
         * e2pdf.dialog.create
         */
        create: function (el) {
            e2pdf.dialog.close();
            var modal = el.attr('data-modal');
            var title = el.attr('data-modal-title');
            var noclose = false;
            var width = '600';
            var height = '600';
            if (modal === 'license-key') {
                width = '400';
                var content = jQuery('<div>', {'class': 'e2pdf-rel'}).append(
                        jQuery('<form>', {'id': 'license_key', 'class': 'e2pdf-license-key e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ),
                        jQuery('<ul>').append(
                        jQuery('<li>').append(
                        jQuery('<label>', {'class': 'e2pdf-mb5'}).html(e2pdfLang['License Key'] + ':'),
                        jQuery('<input>', {'type': 'text', 'name': 'license_key', 'class': 'e2pdf-w100', 'placeholder': e2pdfLang['E2Pdf License Key']})
                        ),
                        jQuery('<li>', {'class': 'e2pdf-center'}).append(
                        jQuery('<input>', {'form-id': "license_key", 'action': 'e2pdf_license_key', 'type': 'button', 'class': 'e2pdf-submit-form button-primary button-small', 'value': e2pdfLang['Apply']})
                        )
                        )
                        )
                        );
            } else if (modal === 'properties') {
                for (var key in e2pdf.element.selected) {
                    var title = e2pdfLang['Properties'];
                    var selected = e2pdf.element.selected[key];
                    var fields = e2pdf.properties.renderFields(selected);
                    var content = jQuery('<div>').append(
                            jQuery('<form>', {'id': 'e2pdf-properties'}).append(
                            jQuery('<div>', {'class': 'e2pdf-el-properties e2pdf-popup-inner'}).append(
                            fields
                            )
                            )
                            );
                }
            } else if (modal === 'page-options') {
                var title = e2pdfLang['Page Options'];
                var page = el.closest('.e2pdf-page');
                var readonly_size = false;
                if (e2pdf.pdf.settings.get('pdf')) {
                    readonly_size = true;
                }

                var content = jQuery('<div>', {'class': 'e2pdf-page-options'}).append(jQuery('<form>', {'id': 'e2pdf-page-options', 'class': 'e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-center'}).append(
                        jQuery('<h3>').html(e2pdfLang['Page Options'])
                        )),
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ));
                var fields = e2pdf.properties.renderFields(page);
                content.find('form').append(jQuery('<div>', {'class': 'e2pdf-el-properties e2pdf-popup-inner'}).append(
                        fields
                        ));
            } else if (modal === 'tpl-actions') {
                width = '600';
                var title = e2pdfLang['Global Actions'];
                var content = jQuery('<div>').append(
                        jQuery('<form>', {'id': 'e2pdf-tpl-actions'}).append(
                        jQuery('<div>', {'class': 'e2pdf-tpl-actions e2pdf-popup-inner'}).append(
                        fields
                        )
                        )
                        );
                var fields = e2pdf.properties.renderFields(jQuery('#e2pdf-tpl'));
                content.find('form').append(jQuery('<div>', {'class': 'e2pdf-el-properties e2pdf-popup-inner'}).append(
                        fields
                        ));
            } else if (modal === 'tpl-options') {
                width = '500';
                var title = e2pdfLang['PDF Options'];
                var readonly_size = false;
                if (e2pdf.pdf.settings.get('pdf')) {
                    readonly_size = true;
                }

                var sizes = jQuery('<select>', {'name': 'preset', 'class': 'e2pdf-preset e2pdf-w100', 'disabled': readonly_size ? 'disabled' : false}).append(
                        jQuery('<option>',
                                {
                                    'value': ''
                                }).html(e2pdfLang['--- Select ---']).attr('selected', 'selected')
                        );
                for (var size in e2pdfTemplateSizes) {
                    var option = jQuery('<option>',
                            {
                                'value': size
                            }).html(size + ' (' + e2pdfTemplateSizes[size]['width'] + 'x' + e2pdfTemplateSizes[size]['height'] + ')');
                    sizes.append(option);
                }

                var extensions = jQuery('<select>', {'name': 'extension', 'id': 'e2pdf-extension', 'class': 'e2pdf-extension e2pdf-w100'});
                for (var extension in e2pdfTemplateExtensions) {
                    var option = jQuery('<option>',
                            {
                                'value': extension
                            }).html(e2pdfTemplateExtensions[extension]);
                    if (e2pdf.pdf.settings.get('extension') === extension) {
                        option.attr('selected', 'selected');
                    }
                    extensions.append(option);
                }

                var content = jQuery('<div>', {'class': 'e2pdf-welcome'}).append(jQuery('<form>', {'id': 'e2pdf-tpl-options', 'class': 'e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-center'}).append(
                        jQuery('<h3>').html(e2pdfLang['PDF Options'])
                        )),
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ));
                var default_width = '595';
                if (e2pdf.pdf.settings.get('width')) {
                    default_width = e2pdf.pdf.settings.get('width');
                }

                var default_height = '842';
                if (e2pdf.pdf.settings.get('height')) {
                    default_height = e2pdf.pdf.settings.get('height');
                }

                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).html(e2pdfLang['Width'] + ':'),
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).html(e2pdfLang['Height'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).append(
                        jQuery('<input>', {'class': 'e2pdf-numbers e2pdf-w100', 'id': 'e2pdf-width', 'type': 'text', 'name': 'width', 'readonly': readonly_size ? 'readonly' : false, 'value': default_width})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).append(
                        jQuery('<input>', {'class': 'e2pdf-numbers e2pdf-w100', 'id': 'e2pdf-height', 'type': 'text', 'name': 'height', 'readonly': readonly_size ? 'readonly' : false, 'value': default_height})
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<label>').html(e2pdfLang['Size Preset'] + ':'),
                        sizes);
                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-mt5'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w60 e2pdf-small e2pdf-pr10'}).html(e2pdfLang['Font'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-small e2pdf-pl10 e2pdf-pr10'}).html(e2pdfLang['Size'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-small e2pdf-pl10'}).html(e2pdfLang['Line Height'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w60 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-font').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-font').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20  e2pdf-pl10 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-font-size').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-font-size').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-pl10'}).append(
                        jQuery('#e2pdf-line-height').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-line-height').val())
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-mt5'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-small e2pdf-pr10'}).html(e2pdfLang['Text Align'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-small e2pdf-pl10'}).html('')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-text-align').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-text-align').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pr10 e2pdf-mt5'}).append(
                        jQuery('#e2pdf-rtl').clone().removeAttr('id').val(jQuery('#e2pdf-rtl').val()),
                        e2pdfLang['RTL']
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<label>', {'class': 'e2pdf-mt5'}).html(e2pdfLang['Extension'] + ':'),
                        extensions,
                        jQuery('<label>').html(e2pdfLang['Item'] + ':'),
                        jQuery('<select>', {'id': 'e2pdf-item', 'name': 'item', 'class': 'e2pdf-item e2pdf-w100'})
                        );
                content.find('form').append(
                        jQuery('<div>', {'id': 'e2pdf-item-options', 'class': 'e2pdf-hide'}).append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib'}).html(e2pdfLang['Labels'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(
                        jQuery('<select>', {'id': 'auto_form_label', 'class': 'e2pdf-w100', 'name': 'auto_form_label'}).append(
                        jQuery('<option>', {'value': '0'}).text(e2pdfLang['None']),
                        jQuery('<option>', {'value': 'value'}).text(e2pdfLang['Field Values']),
                        jQuery('<option>', {'value': 'name'}).text(e2pdfLang['Field Names'])
                        ).val('0'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100 e2pdf-align-right e2pdf-mt5'}).append(
                        jQuery('<label>', {'class': 'e2pdf-label e2pdf-small e2pdf-wauto'}).append(
                        jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-ib', 'name': 'auto_form_shortcode', 'value': '1'}),
                        e2pdfLang['Shortcodes']
                        )
                        )
                        )
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<div>', {'id': 'e2pdf-item-merged', 'class': 'e2pdf-hide'}).append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).html(e2pdfLang['Item'] + ' #1:'),
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).html(e2pdfLang['Item'] + ' #2:')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).append(
                        jQuery('<select>', {'class': 'e2pdf-w100', 'id': 'e2pdf-item1', 'type': 'text', 'name': 'item1'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).append(
                        jQuery('<select>', {'class': 'e2pdf-w100', 'id': 'e2pdf-item2', 'type': 'text', 'name': 'item2'})
                        )
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<input>', {'id': 'e2pdf-upload-pdf', 'type': 'file', 'name': 'pdf', 'class': 'e2pdf-upload-pdf e2pdf-hide'})
                        );
                if (e2pdf.pdf.settings.get('pdf')) {
                    content.find('form').append(
                            jQuery('<ul>', {'class': 'e2pdf-mb0 e2pdf-mt15'}).append(
                            jQuery('<li>'),
                            jQuery('<li>').append(
                            jQuery('<a>', {'id': 'e2pdf-w-apply', 'href': 'javascript:void(0);', 'data-action': 'apply', 'class': 'e2pdf-create-pdf e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Apply'])
                            ),
                            jQuery('<li>')
                            )
                            );
                } else {
                    content.find('form').append(
                            jQuery('<ul>', {'class': 'e2pdf-mb0 e2pdf-mt15'}).append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'id': 'e2pdf-w-apply', 'href': 'javascript:void(0);', 'data-action': 'apply', 'class': 'e2pdf-create-pdf e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Apply'])
                            ),
                            jQuery('<li>'),
                            jQuery('<li>').append(
                            jQuery('<a>', {'id': 'e2pdf-w-auto', 'href': 'javascript:void(0);', 'data-action': 'auto', 'class': 'e2pdf-create-pdf e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Auto PDF'])
                            )
                            )
                            );
                }

            } else if (modal === 'welcome-screen') {
                var noclose = true;
                width = '500';
                var title = e2pdfLang['Create PDF'];
                var sizes = jQuery('<select>', {'id': 'e2pdf-preset', 'name': 'preset', 'class': 'e2pdf-preset e2pdf-w100'}).append(
                        jQuery('<option>',
                                {
                                    'value': ''
                                }).html(e2pdfLang['--- Select ---']).attr('selected', 'selected')
                        );
                for (var size in e2pdfTemplateSizes) {
                    var option = jQuery('<option>',
                            {
                                'value': size,
                                'data-width': e2pdfTemplateSizes[size]['width'],
                                'data-height': e2pdfTemplateSizes[size]['height']
                            }).html(size + ' (' + e2pdfTemplateSizes[size]['width'] + 'x' + e2pdfTemplateSizes[size]['height'] + ')');
                    sizes.append(option);
                }

                var extensions = jQuery('<select>', {'name': 'extension', 'id': 'e2pdf-extension', 'class': 'e2pdf-extension e2pdf-w100'});
                for (var extension in e2pdfTemplateExtensions) {
                    var option = jQuery('<option>',
                            {
                                'value': extension
                            }).html(e2pdfTemplateExtensions[extension]);
                    if (e2pdf.pdf.settings.get('extension') === extension) {
                        option.attr('selected', 'selected');
                    }
                    extensions.append(option);
                }

                var content = jQuery('<div>', {'class': 'e2pdf-welcome'}).append(jQuery('<form>', {'id': 'e2pdf-welcome-screen', 'class': 'e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-center'}).append(
                        jQuery('<h3>').html(e2pdfLang['PDF Options'])
                        )),
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ));
                var default_width = '595';
                if (e2pdf.pdf.settings.get('width')) {
                    var default_width = e2pdf.pdf.settings.get('width');
                }

                var default_height = '842';
                if (e2pdf.pdf.settings.get('height')) {
                    var default_height = e2pdf.pdf.settings.get('height');
                }

                var disabled_activation = false;
                if (parseInt(e2pdf.pdf.settings.get('templates_limit')) <= 0 && e2pdf.pdf.settings.get('activated') != '1') {
                    disabled_activation = 'disabled';
                }

                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w70 e2pdf-pr10'}).html(e2pdfLang['Title'] + ':'),
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pl10'}).html(e2pdfLang['Status'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w70 e2pdf-pr10'}).append(
                        jQuery('<input>', {'id': 'e2pdf-title', 'type': 'text', 'name': 'title', 'class': 'e2pdf-w100', 'value': jQuery('#e2pdf-build-form').find('input[name="title"]').val()})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pl10'}).append(
                        jQuery('<select>', {'id': 'e2pdf-activated', 'class': 'e2pdf-w100', 'name': 'activated'}).append(
                        jQuery('<option>', {'value': '0'}).text(e2pdfLang['Not Activated']),
                        jQuery('<option>', {'value': '1', 'disabled': disabled_activation}).text(e2pdfLang['Activated'])
                        ).val(e2pdf.pdf.settings.get('activated'))
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-mt5'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).html(e2pdfLang['Width'] + ':'),
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).html(e2pdfLang['Height'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).append(
                        jQuery('<input>', {'class': 'e2pdf-numbers e2pdf-w100', 'id': 'e2pdf-width', 'type': 'text', 'name': 'width', 'value': default_width})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).append(
                        jQuery('<input>', {'class': 'e2pdf-numbers e2pdf-w100', 'id': 'e2pdf-height', 'type': 'text', 'name': 'height', 'value': default_height})
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<label>').html(e2pdfLang['Size Preset'] + ':'),
                        sizes);
                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-mt5'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w60 e2pdf-small e2pdf-pr10'}).html(e2pdfLang['Font'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-small e2pdf-pl10 e2pdf-pr10'}).html(e2pdfLang['Size'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-small e2pdf-pl10'}).html(e2pdfLang['Line Height'] + ':'),
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w60 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-font').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-font').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20  e2pdf-pl10 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-font-size').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-font-size').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-pl10'}).append(
                        jQuery('#e2pdf-line-height').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-line-height').val())
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-mt5'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-small e2pdf-pr10'}).html(e2pdfLang['Text Align'] + ':'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-small e2pdf-pl10'}).html('')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pr10'}).append(
                        jQuery('#e2pdf-text-align').clone().removeAttr('id').attr('class', 'e2pdf-w100').val(jQuery('#e2pdf-text-align').val())
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pr10 e2pdf-mt5'}).append(
                        jQuery('#e2pdf-rtl').clone().removeAttr('id').val(jQuery('#e2pdf-rtl').val()),
                        e2pdfLang['RTL']
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<label>', {'class': 'e2pdf-mt5'}).html(e2pdfLang['Extension'] + ':'),
                        extensions,
                        jQuery('<label>').html(e2pdfLang['Item'] + ':'),
                        jQuery('<select>', {'id': 'e2pdf-item', 'name': 'item', 'class': 'e2pdf-item e2pdf-w100'})
                        );
                content.find('form').append(
                        jQuery('<div>', {'id': 'e2pdf-item-options', 'class': 'e2pdf-hide'}).append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib'}).html(e2pdfLang['Labels'] + ':')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(
                        jQuery('<select>', {'id': 'auto_form_label', 'class': 'e2pdf-w100', 'name': 'auto_form_label'}).append(
                        jQuery('<option>', {'value': '0'}).text(e2pdfLang['None']),
                        jQuery('<option>', {'value': 'value'}).text(e2pdfLang['Field Values']),
                        jQuery('<option>', {'value': 'name'}).text(e2pdfLang['Field Names'])
                        ).val('0'),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100 e2pdf-align-right e2pdf-mt5'}).append(
                        jQuery('<label>', {'class': 'e2pdf-label e2pdf-small e2pdf-wauto'}).append(
                        jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-ib', 'name': 'auto_form_shortcode', 'value': '1'}),
                        e2pdfLang['Shortcodes']
                        )
                        )
                        )
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<div>', {'id': 'e2pdf-item-merged', 'class': 'e2pdf-hide'}).append(
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).html(e2pdfLang['Item'] + ' #1:'),
                        jQuery('<label>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).html(e2pdfLang['Item'] + ' #2:')
                        ),
                        jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr10'}).append(
                        jQuery('<select>', {'class': 'e2pdf-w100', 'id': 'e2pdf-item1', 'type': 'text', 'name': 'item1'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl10'}).append(
                        jQuery('<select>', {'class': 'e2pdf-w100', 'id': 'e2pdf-item2', 'type': 'text', 'name': 'item2'})
                        )
                        )
                        )
                        );
                content.find('form').append(
                        jQuery('<input>', {'id': 'e2pdf-upload-pdf', 'type': 'file', 'name': 'pdf', 'class': 'e2pdf-upload-pdf e2pdf-hide'})
                        );
                content.find('form').append(
                        jQuery('<input>', {'type': 'hidden', 'name': 'pdf', 'value': ''})
                        );
                if (e2pdf.pdf.settings.get('ID')) {
                    content.find('form').append(
                            jQuery('<input>', {'id': 'template_id', 'type': 'hidden', 'name': 'template_id', 'value': e2pdf.pdf.settings.get('ID')})
                            );
                }

                content.find('form').append(
                        jQuery('<ul>', {'class': 'e2pdf-mb0 e2pdf-mt15'}).append(
                        jQuery('<li>').append(
                        jQuery('<a>', {'id': 'e2pdf-w-empty', 'href': 'javascript:void(0);', 'data-action': 'empty', 'class': 'e2pdf-create-pdf e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Empty PDF'])
                        ),
                        jQuery('<li>').append(
                        jQuery('<a>', {'id': 'e2pdf-w-upload', 'href': 'javascript:void(0);', 'data-action': 'upload', 'class': 'e2pdf-create-pdf e2pdf-w-upload e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Upload PDF']).append(jQuery('<span>').html(e2pdfLang['Max Filesize'] + ": " + e2pdfParams['upload_max_filesize']))
                        ),
                        jQuery('<li>').append(
                        jQuery('<a>', {'id': 'e2pdf-w-auto', 'href': 'javascript:void(0);', 'data-action': 'auto', 'class': 'e2pdf-create-pdf e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Auto PDF'])
                        )
                        )
                        );
            } else if (modal === 'visual-mapper') {
                var title = e2pdfLang['Visual Mapper'];
                var content = jQuery('<div>', {'id': 'visual-mapper', 'class': 'visual-mapper'}).append(
                        jQuery('<form>', {'class': 'e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        )).append(
                        jQuery('<div>', {'id': 'e2pdf-vm-inner', 'class': 'e2pdf-popup-inner'}).append(
                        jQuery('<div>', {'id': 'e2pdf-vm-content', 'class': 'e2pdf-vm-content e2pdf-rel'})
                        )
                        ));
            } else if (modal === 'pdf-reupload') {
                var title = e2pdfLang['PDF Upload'];
                width = '500';
                var content = jQuery('<div>', {'class': 'e2pdf-welcome'}).append(jQuery('<form>', {'id': 'e2pdf-reupload-pdf-form', 'class': 'e2pdf-rel'}).append(
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-center'}).append(
                        jQuery('<h3>').html(e2pdfLang['PDF Options'])
                        )),
                        jQuery('<div>', {'class': 'e2pdf-form-loader'}).append(
                        jQuery('<span>', {'class': 'spinner'})
                        ));
                content.find('form').append(
                        jQuery('<input>', {'id': 'e2pdf-reupload-pdf', 'type': 'file', 'name': 'pdf', 'class': 'e2pdf-reupload-pdf e2pdf-hide'})
                        );
                if (e2pdf.pdf.settings.get('ID')) {
                    content.find('form').append(
                            jQuery('<input>', {'id': 'template_id', 'type': 'hidden', 'name': 'template_id', 'value': e2pdf.pdf.settings.get('ID')})
                            );
                }

                var pages = jQuery('<div>', {'class': 'e2pdf-reupload-pages'});
                pages.append(
                        jQuery('<div>', {'class': 'e2pdf-grid e2pdf-reupload-pages-header'}).append(
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-pr10 e2pdf-center'}).append(
                        jQuery('<label>').text(e2pdfLang['Page ID'])
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w30 e2pdf-pl10 e2pdf-pr10 e2pdf-center'}).append(
                        jQuery('<label>').text(e2pdfLang['Page ID inside Upload PDF'])
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w25 e2pdf-pl10 e2pdf-center'}).append(
                        jQuery('<label>').text(e2pdfLang['Render Fields from Upload PDF'])
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w25 e2pdf-pl10 e2pdf-pr10 e2pdf-center'}).append(
                        jQuery('<label>').text(e2pdfLang['Delete created E2Pdf Fields'])
                        )));
                jQuery('.e2pdf-page').each(function () {
                    var page_id = jQuery(this).attr('data-page_id');
                    pages.append(
                            jQuery('<div>', {'class': 'e2pdf-grid'}).append(
                            jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w20 e2pdf-pr10 e2pdf-center'}).text(page_id),
                            jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w5 e2pdf-center'}).append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-delete-reupload-page'}).append(
                            jQuery('<i>', {'class': 'dashicons dashicons-no'})
                            )
                            ),
                            jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w25 e2pdf-pl10 e2pdf-pr10 e2pdf-center'}).append(
                            jQuery('<input>', {'name': 'positions[' + page_id + ']', 'type': 'text', 'class': 'e2pdf-numbers e2pdf-center e2pdf-w100', 'value': page_id})
                            ),
                            jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w25 e2pdf-pl10 e2pdf-center'}).append(
                            jQuery('<input>', {'name': 'new[]', 'type': 'checkbox', 'value': page_id})
                            ),
                            jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w25 e2pdf-pl10 e2pdf-pr10 e2pdf-center'}).append(
                            jQuery('<input>', {'name': 'flush[]', 'type': 'checkbox', 'value': page_id})
                            )
                            )
                            );
                });
                content.find('form').append(pages);
                content.find('form').append(
                        jQuery('<ul>').append(
                        jQuery('<li>').append(
                        ),
                        jQuery('<li>').append(
                        jQuery('<a>', {'id': 'e2pdf-w-reupload', 'href': 'javascript:void(0);', 'class': 'e2pdf-w-reupload e2pdf-submit button-primary button-large e2pdf-link'}).html(e2pdfLang['Upload PDF'])
                        ),
                        jQuery('<li>').append(
                        )
                        )
                        );
            } else {
                var content = jQuery('<div>');
            }

            if (typeof content !== 'undefined') {

                var dialog_class = 'e2pdf-dialog';
                if (modal === 'visual-mapper') {
                    dialog_class += ' e2pdf-dialog-visual-mapper';
                } else if (modal === 'properties') {
                    dialog_class += ' e2pdf-dialog-element-properties';
                    dialog_class += ' for-' + selected.data('data-type');
                }

                content.dialog({
                    title: title,
                    dialogClass: dialog_class,
                    modal: true,
                    width: width,
                    maxHeight: Math.min(height, jQuery(window).height() - 80),
                    resizable: false,
                    minHeight: 0,
                    closeText: '',
                    my: "center",
                    at: "center",
                    open: function (event, ui) {
                        if (noclose) {
                            jQuery(".ui-dialog-titlebar-close", ui.dialog | ui).off().click(function (e) {
                                location.href = e2pdf.url.build('e2pdf-templates');
                                e.preventDefault();
                            });
                        } else {
                            jQuery('.ui-widget-overlay').bind('click', function ()
                            {
                                content.dialog('close');
                            });
                        }

                        var dialog_height = jQuery('.e2pdf-dialog').height();
                        if (modal === 'properties') {
                            jQuery(".ui-dialog-titlebar").after(
                                    jQuery('<div>', {'class': 'e2pdf-dialog-over e2pdf-align-right'}).append(
                                    jQuery('<input>', {'form-id': "e2pdf-properties", 'type': 'button', 'class': 'e2pdf-submit-local button-primary button-small', 'value': e2pdfLang['Save']})
                                    )
                                    );
                        } else if (modal === 'tpl-actions') {
                            jQuery(".ui-dialog-titlebar").after(
                                    jQuery('<div>', {'class': 'e2pdf-dialog-over e2pdf-align-right'}).append(
                                    jQuery('<input>', {'form-id': "e2pdf-tpl-actions", 'type': 'button', 'class': 'e2pdf-submit-local button-primary button-small', 'value': e2pdfLang['Save']})
                                    )
                                    );
                        } else if (modal === 'visual-mapper') {
                            jQuery(".ui-dialog-titlebar").after(
                                    jQuery('<div>', {'class': 'e2pdf-dialog-over'}).append(
                                    jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(
                                    jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w40 e2pdf-pr10'}).append(
                                    jQuery('<input>', {'type': 'text', 'name': 'vm_search', 'class': 'e2pdf-ib e2pdf-w100 e2pdf-hide', 'value': '', 'placeholder': e2pdfLang['Search...']})
                                    ),
                                    jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w60 e2pdf-align-right'}).append(
                                    jQuery('<label>', {'class': 'e2pdf-label e2pdf-wauto e2pdf-pr10'}).append(
                                    jQuery('<input>', {'type': 'checkbox', 'name': 'vm_hidden', 'class': 'e2pdf-ib', 'value': '1', 'checked': e2pdf.static.vm.hidden ? 'checked' : false})
                                    ).append(e2pdfLang['Hidden Fields']),
                                    jQuery('<label>', {'class': 'e2pdf-label e2pdf-wauto e2pdf-pl10 e2pdf-pr10'}).append(
                                    jQuery('<input>', {'type': 'checkbox', 'name': 'vm_replace', 'class': 'e2pdf-ib', 'value': '1', 'checked': e2pdf.static.vm.replace ? 'checked' : false})
                                    ).append(e2pdfLang['Replace Value']),
                                    jQuery('<label>', {'class': 'e2pdf-label e2pdf-wauto e2pdf-pl10'}).append(
                                    jQuery('<input>', {'type': 'checkbox', 'name': 'vm_close', 'class': 'e2pdf-ib', 'value': '1', 'checked': e2pdf.static.vm.close ? 'checked' : false})
                                    ).append(e2pdfLang['Auto-Close'])
                                    )
                                    )
                                    )
                                    );
                        } else if (modal === 'page-options') {
                            jQuery(".ui-dialog-titlebar").after(
                                    jQuery('<div>', {'class': 'e2pdf-dialog-over e2pdf-align-right'}).append(
                                    jQuery('<input>', {'form-id': "e2pdf-page-options", 'type': 'button', 'class': 'e2pdf-submit-local button-primary button-small', 'value': e2pdfLang['Save']})
                                    )
                                    );
                        }

                        jQuery('.e2pdf-dialog').find(".ui-dialog-content").dialog('option', 'maxHeight', Math.min(height, jQuery(window).height() - 80));
                        var dialog_width = Math.min(width, jQuery(window).width() - 80);
                        jQuery('.e2pdf-dialog').css({'position': 'fixed', 'top': (jQuery(window).height() - dialog_height) / 2, 'left': ((jQuery(window).width() - dialog_width) / 2), 'max-width': dialog_width});
                    },
                    closeOnEscape: modal === 'welcome-screen' || modal === 'tpl-options' ? false : true,
                    beforeClose: function () {
                        if (modal === 'visual-mapper') {

                        }
                    },
                    close: function (event, ui)
                    {
                        if (jQuery(this).find('.wp-color-result.wp-picker-open').length > 0) {
                            jQuery(this).find('.wp-color-result.wp-picker-open').each(function () {
                                jQuery(this).click();
                            });
                        }
                        e2pdf.visual.mapper.selected = null;
                        jQuery(this).remove();
                    }
                });
            }

            if (modal === 'welcome-screen' || modal === 'tpl-options') {
                jQuery('#e2pdf-extension').trigger('change');
            } else if (modal === 'visual-mapper') {
                var data = {};
                data['extension'] = e2pdf.pdf.settings.get('extension');
                data['item'] = e2pdf.pdf.settings.get('item');
                data['item1'] = e2pdf.pdf.settings.get('item1');
                data['item2'] = e2pdf.pdf.settings.get('item2');
                e2pdf.request.submitRequest('e2pdf_visual_mapper', jQuery('#e2pdf-vm-content'), data);
            }
            e2pdf.event.fire('after.dialog.create');
        },
        /*
         * e2pdf.dialog.close
         */
        close: function () {
            if (jQuery('.e2pdf-dialog').length > 0) {
                jQuery('.ui-dialog-content').dialog('close');
            }
        },
        /*
         * e2pdf.dialog.rebuild
         */
        rebuild: function () {
            if (jQuery('.e2pdf-dialog').length > 0) {
                var dialog = jQuery('.e2pdf-dialog').find(".ui-dialog-content");
                var width = dialog.data("ui-dialog").options.width;
                var height = 600;
                dialog.dialog('option', 'maxHeight', Math.min(height, jQuery(window).height() - 80));
                var dialog_height = jQuery('.e2pdf-dialog').height();
                var dialog_width = Math.min(width, jQuery(window).width() - 80);
                jQuery('.e2pdf-dialog').css({'position': 'fixed', 'top': (jQuery(window).height() - dialog_height) / 2, 'left': ((jQuery(window).width() - dialog_width) / 2), 'max-width': dialog_width});
                e2pdf.visual.mapper.rebuild();
            }
        }
    },
    /*
     * e2pdf.mediaUploader
     */
    mediaUploader: {
        /*
         * e2pdf.mediaUploader.init
         */
        init: function (el) {
            var mediaUploader;
            mediaUploader = wp.media.frames.file_frame = wp.media({
                title: e2pdfLang['Choose Image'],
                button: {
                    text: e2pdfLang['Choose Image']
                }, multiple: false});
            mediaUploader.on('select', function () {
                var attachment = mediaUploader.state().get('selection').first().toJSON();
                e2pdf.properties.set(el, 'value', attachment.url);
                e2pdf.properties.render(el);
                e2pdf.event.fire('after.mediaUploader.select');
            });
            mediaUploader.open();
        }
    },
    /*
     * e2pdf.actions
     */
    actions: {
        /*
         * e2pdf.actions.add
         */
        add: function (el, target, action) {
            var last_id = -1;
            target.find('.e2pdf-action').each(function () {
                var num_id = parseInt(jQuery(this).attr("data-action_id"));
                if (num_id > last_id) {
                    last_id = num_id;
                }
            });
            var action_id = parseInt(last_id + 1);
            if (action) {
                target.append(e2pdf.actions.renderField(el, action_id, action));
            } else {
                target.append(e2pdf.actions.renderField(el, action_id));
            }

        },
        /*
         * e2pdf.actions.change
         */
        change: function (action, trigger) {
            var action_id = action.attr("data-action_id");
            var form = action.closest('form');
            var data = e2pdf.form.serializeObject(form);
            var el = false;
            if (form.attr('id') === 'e2pdf-page-options') {
                el = jQuery('.e2pdf-page[data-page_id="' + data.page_id + '"]');
            } else if (form.attr('id') === 'e2pdf-tpl-actions') {
                el = jQuery('#e2pdf-tpl');
            } else {
                el = jQuery(".e2pdf-element[data-element_id='" + data.element_id + "']").first();
            }

            var formatRegex = new RegExp('actions\\[\\d+\\]\\[format\\]');
            if (!formatRegex.test(trigger.attr('name'))) {
                data['actions'][action_id]['change'] = '';
            }

            action.replaceWith(e2pdf.actions.renderField(el, action_id, data['actions'][action_id]));
            e2pdf.event.fire('after.actions.change');
        },

        /*
         * e2pdf.actions.duplicate
         */
        duplicate: function (action) {
            var actions = action.closest('.e2pdf-actions-wrapper').find('.e2pdf-actions');
            var action_id = action.attr("data-action_id");
            var form = action.closest('form');
            var data = e2pdf.form.serializeObject(form);
            var el = false;
            if (form.attr('id') === 'e2pdf-page-options') {
                el = jQuery('.e2pdf-page[data-page_id="' + data.page_id + '"]');
            } else if (form.attr('id') === 'e2pdf-tpl-actions') {
                el = jQuery('#e2pdf-tpl');
            } else {
                el = jQuery(".e2pdf-element[data-element_id='" + data.element_id + "']").first();
            }
            e2pdf.actions.add(el, actions, data['actions'][action_id]);
            e2pdf.event.fire('after.actions.change');
        },
        /*
         * e2pdf.actions.delete
         */
        delete: function (action) {
            action.remove();
        },
        /*
         * e2pdf.actions.conditions
         */
        conditions: {
            /*
             * e2pdf.actions.conditions.add
             */
            add: function (el, target) {
                var action = target.closest('.e2pdf-action');
                var action_id = action.attr('data-action_id');
                var last_id = -1;
                target.find('.e2pdf-condition').each(function () {
                    var num_id = parseInt(jQuery(this).attr("data-condition_id"));
                    if (num_id > last_id) {
                        last_id = num_id;
                    }
                });
                var condition_id = parseInt(last_id + 1);
                action.find('.e2pdf-conditions').append(
                        e2pdf.actions.conditions.renderField(el, action_id, condition_id)
                        );
            },
            /*
             * e2pdf.actions.conditions.getFields
             */
            getFields: function (el, action_id, condition_id, condition) {
                var obj = {
                    'condition': {
                        'fields': [
                            e2pdf.actions.conditions.getField('if', el, action_id, condition_id, condition),
                            e2pdf.actions.conditions.getField('condition', el, action_id, condition_id, condition),
                            e2pdf.actions.conditions.getField('value', el, action_id, condition_id, condition)
                        ],
                        'classes': [
                            'e2pdf-ib e2pdf-w30 e2pdf-pr5',
                            'e2pdf-ib e2pdf-w25 e2pdf-pl5 e2pdf-pr5',
                            'e2pdf-ib e2pdf-w35 e2pdf-pl5 e2pdf-pr5'
                        ]
                    }
                };
                return obj;
            },
            /*
             * e2pdf.actions.conditions.getField
             */
            getField: function (field, el, action_id, condition_id, condition) {
                var obj = false;
                switch (field) {
                    case 'if':
                        var value = condition ? condition.if : '';
                        obj = {
                            'name': e2pdfLang['If'],
                            'key': 'actions[' + action_id + '][conditions][' + condition_id + '][if]',
                            'type': 'textarea',
                            'value': value,
                            'atts': []
                        };
                        break;
                    case 'condition':
                        var value = condition ? condition.condition : '=';
                        obj = {
                            'name': e2pdfLang['Condition'],
                            'key': 'actions[' + action_id + '][conditions][' + condition_id + '][condition]',
                            'type': 'select',
                            'value': value,
                            'options': [
                                {'=': '='},
                                {'!=': '!='},
                                {'>': '>'},
                                {'>=': '>='},
                                {'<': '<'},
                                {'<=': '<='},
                                {'like': e2pdfLang['Contains']},
                                {'not_like': e2pdfLang['Not Contains']}
                            ],
                            'atts': []
                        };
                        break;
                    case 'value':
                        var value = condition ? condition.value : '';
                        obj = {
                            'name': e2pdfLang['Value'],
                            'key': 'actions[' + action_id + '][conditions][' + condition_id + '][value]',
                            'type': 'textarea',
                            'value': value,
                            'atts': []
                        };
                        break;
                }

                return obj;
            },
            /*
             * e2pdf.actions.conditions.delete
             */
            delete: function (condition) {
                condition.remove();
            },
            /*
             * e2pdf.actions.conditions.renderField
             */
            renderField: function (el, action_id, condition_id, condition) {
                var groups = e2pdf.actions.conditions.getFields(el, action_id, condition_id, condition);
                if (groups) {
                    for (var group_key in groups) {

                        var group = groups[group_key];
                        var grid = jQuery('<div>', {'class': 'e2pdf-grid'});
                        for (var field_key in group.fields) {
                            var group_field = group.fields[field_key];
                            var classes = '';
                            if (group.classes) {
                                if (group.classes[field_key]) {
                                    classes = group.classes[field_key];
                                }
                            }

                            var field = '';
                            var label = '';
                            var wrap = '';
                            if (group_field.type === 'text') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<input>', {'type': 'text', 'class': 'e2pdf-w100', 'name': group_field.key, 'value': group_field.value});
                            } else if (group_field.type === 'hidden') {
                                field = jQuery('<input>', {'type': 'hidden', 'name': group_field.key, 'value': group_field.value});
                            } else if (group_field.type === 'textarea') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<textarea>', {'name': group_field.key, 'class': 'e2pdf-w100', 'rows': '5'}).val(group_field.value);
                            } else if (group_field.type === 'checkbox') {
                                label = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-small e2pdf-pr10 e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-ib e2pdf-w50 e2pdf-small e2pdf-pl10', 'name': group_field.key, 'value': group_field.option});
                                if (group_field.value == group_field.option) {
                                    field.prop('checked', true);
                                }
                            } else if (group_field.type === 'color') {
                                wrap = jQuery('<div>', {'class': 'e2pdf-colorpicker-wr'});
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<input>', {'class': 'e2pdf-color-picker e2pdf-color-picker-load e2pdf-w100', 'type': 'text', 'name': group_field.key, 'value': group_field.value});
                                if (group_field.key === 'border_color') {
                                    field.attr('data-default', '#000000');
                                }
                            } else if (group_field.type === 'select') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<select>', {'class': 'e2pdf-w100', 'name': group_field.key});
                                for (var option_key in group_field.options) {
                                    field.append(jQuery('<option>', {'value': Object.keys(group_field.options[option_key])[0]}).html(Object.values(group_field.options[option_key])[0]));
                                }
                                field.val(group_field.value);
                            }

                            if (!wrap) {
                                wrap = field;
                            } else {
                                wrap.prepend(field);
                            }

                            grid.append(jQuery('<div>', {'class': 'e2pdf-ib ' + classes}).append(label, wrap));
                        }
                    }
                }

                grid.append(jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w10 e2pdf-pl5 e2pdf-mt23 e2pdf-center'}).append(
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-condition-add'}).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-plus'})
                        ),
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-condition-delete'}).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-minus'})
                        )));
                var new_condition = jQuery("<div>", {'class': 'e2pdf-ib e2pdf-condition e2pdf-w100', 'data-condition_id': condition_id}).append(
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-duplicate'}).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-admin-page'})
                        ),
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-delete'}).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-no'})
                        ),
                        jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(
                        grid
                        )
                        );
                return new_condition;
            }
        },
        /*
         * e2pdf.actions.get
         */
        get: function (el) {
            var actions = [];
            if (typeof el.data('data-actions') !== 'undefined') {
                actions = JSON.parse(el.data('data-actions'));
                actions = Object.values(actions).sort(function (a, b) {
                    if (parseInt(a.order) === parseInt(b.order)) {
                        return 0;
                    }
                    return parseInt(a.order) < parseInt(b.order) ? -1 : 1;
                });
            }
            return actions;
        },
        /*
         * e2pdf.actions.apply
         */
        apply: function (el, data) {
            if (!data) {
                data = [];
            }
            el.data('data-actions', JSON.stringify(data));
        },
        /*
         * e2pdf.actions.getField
         */
        getField: function (field, el, action_id, action) {

            var obj = false;
            switch (field) {
                case 'order':
                    var value = action ? action.order : '0';
                    obj = {
                        'name': e2pdfLang['Order'],
                        'key': 'actions[' + action_id + '][order]',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'format':
                    var value = action && typeof action.format !== 'undefined' ? action.format : 'replace';
                    obj = {
                        'name': e2pdfLang['Format'],
                        'key': 'actions[' + action_id + '][format]',
                        'type': 'select',
                        'value': value,
                        'options': [
                            {'insert_before': e2pdfLang['Insert Before']},
                            {'insert_after': e2pdfLang['Insert After']},
                            {'replace': e2pdfLang['Full Replacement']},
                            {'search': e2pdfLang['Search & Replace']},
                        ],
                        'atts': []
                    };
                    break;

                case 'search':
                    var value = action && typeof action.search !== 'undefined' ? action.search : '';
                    obj = {
                        'name': 'Search',
                        'key': 'actions[' + action_id + '][search]',
                        'type': 'textarea',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'action':
                    if (el.data('data-type') == 'e2pdf-tpl') {
                        var value = action ? action.action : 'access_by_url';
                        var options = [
                            {'access_by_url': e2pdfLang['Allow PDF Access By URL']},
                            {'restrict_access_by_url': e2pdfLang['Restrict PDF Access By URL']},
                            {'restrict_process_shortcodes': e2pdfLang['Restrict Process Shortcodes']}
                        ];
                    } else if (el.data('data-type') == 'e2pdf-page') {
                        var value = action ? action.action : 'hide';
                        var options = [
                            {'hide': e2pdfLang['Hide Page']},
                            {'show': e2pdfLang['Show Page']},
                            {'change': e2pdfLang['Change Property']}
                        ];
                    } else {
                        var value = action ? action.action : 'hide';
                        var options = [
                            {'hide': e2pdfLang['Hide Element']},
                            {'show': e2pdfLang['Show Element']},
                            {'change': e2pdfLang['Change Property']}
                        ];
                    }

                    obj = {
                        'name': e2pdfLang['Action'],
                        'key': 'actions[' + action_id + '][action]',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    break;
                case 'error_message':
                    if (el.data('data-type') == 'e2pdf-tpl') {
                        var value = action ? action.error_message : '';
                        obj = {
                            'name': e2pdfLang['Error Message'],
                            'key': 'actions[' + action_id + '][error_message]',
                            'type': 'textarea',
                            'value': value,
                            'atts': []
                        };
                    }
                    break;
                case 'else':
                    if (el.data('data-type') == 'e2pdf-page') {
                        var options = [
                            {'': '-'},
                            {'hide': e2pdfLang['Hide Page']}
                        ];
                    } else {
                        var options = [
                            {'': '-'},
                            {'hide': e2pdfLang['Hide Element']}
                        ];
                    }

                    var value = action && typeof action.else !== 'undefined' ? action.else : 'hide';
                    obj = {
                        'name': e2pdfLang['Else'],
                        'key': 'actions[' + action_id + '][else]',
                        'type': 'select',
                        'options': options,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'property':
                    var value = action ? action.property : '';
                    if (action && action.action === 'change') {
                        var options = [];
                        var option = {
                            '': e2pdfLang['--- Select ---']
                        };
                        options.push(option);
                        var groups = e2pdf.properties.getFields(el);
                        var disabled_properties = [];
                        if (el.data('data-type') == 'e2pdf-page') {
                            disabled_properties = ['page_id', 'element_type', 'preset'];
                        } else {
                            disabled_properties = ['element_id', 'element_type'];
                        }
                        for (var group_key in groups) {
                            var group = groups[group_key];
                            for (var field_key in group.fields) {
                                var group_field = group.fields[field_key];
                                if (jQuery.inArray(group_field.key, disabled_properties) === -1 && group_field.type != 'link') {
                                    var option = {};
                                    if (group.classes && group.classes[field_key] && group.classes[field_key].includes("e2pdf-hide-label")) {
                                        option[group_field.key] = group.name;
                                    } else {
                                        option[group_field.key] = group.name + ' ' + group_field.name;
                                    }
                                    options.push(option);
                                }
                            }
                        }

                        obj = {
                            'name': e2pdfLang['Property'],
                            'key': 'actions[' + action_id + '][property]',
                            'type': 'select',
                            'value': value,
                            'options': options,
                            'atts': []
                        };
                    }
                    break;
                case 'change':
                    var value = action ? action.change : '';
                    if (
                            action
                            && typeof action.action !== 'undefined'
                            && action.action === 'change'
                            && typeof action.property !== 'undefined'
                            && action.property !== ''
                            ) {

                        var property = e2pdf.properties.getField(action.property, el);
                        if (property) {
                            if (action.property == 'value'
                                    && typeof action.format !== 'undefined'
                                    && (action.format == 'insert_before' || action.format == 'insert_after')) {
                                property.name = e2pdfLang['Value'];
                            } else if (property.type != 'checkbox') {
                                property.name = e2pdfLang['Change to'];
                            }
                            property.key = 'actions[' + action_id + '][change]';
                            if (jQuery.inArray('readonly', property.atts) !== -1 && jQuery.inArray('changeable', property.atts) !== -1) {
                                property.atts.splice(jQuery.inArray('readonly', property.atts), 1);
                            }
                            if (jQuery.inArray('readonly', property.atts) === -1) {
                                if (property.type === 'select') {
                                    for (var key in property.options) {
                                        if (Object.keys(property.options[key])[0] == value) {
                                            property.value = value;
                                            break;
                                        }
                                    }
                                } else if (jQuery.inArray('number', property.atts) !== -1) {
                                    if (value === '') {
                                        property.value = 0;
                                    } else {
                                        property.value = value;
                                    }
                                } else {
                                    property.value = value;
                                }
                            }
                            obj = property;
                        }
                    }
                    break;
                case 'apply':
                    var value = action ? action.apply : 'any';
                    obj = {
                        'name': e2pdfLang['Apply If'],
                        'key': 'actions[' + action_id + '][apply]',
                        'type': 'select',
                        'value': value,
                        'options': [
                            {'any': e2pdfLang['Any']},
                            {'all': e2pdfLang['All']}
                        ],
                        'atts': []
                    };
                    break;
            }
            return obj;
        },
        /*
         * e2pdf.actions.getFields
         */
        getFields: function (el, action_id, action) {
            var obj = {
                'action': {
                    'fields': [
                        e2pdf.actions.getField('order', el, action_id, action),
                        e2pdf.actions.getField('action', el, action_id, action),
                        e2pdf.actions.getField('property', el, action_id, action),
                        e2pdf.actions.getField('apply', el, action_id, action)
                    ],
                    'classes': [
                        'e2pdf-w10 e2pdf-pr5 e2pdf-action-order',
                        'e2pdf-w35 e2pdf-pr5 e2pdf-action-action',
                        'e2pdf-w40 e2pdf-pl5 e2pdf-pr5 e2pdf-action-property',
                        'e2pdf-w15 e2pdf-pl5'
                    ]
                }
            };
            if (
                    action
                    && typeof action.action !== 'undefined'
                    && action.action === 'change'
                    && typeof action.property !== 'undefined'
                    && action.property !== ''
                    ) {
                if (action.property == 'value' && typeof action.format !== 'undefined' && action.format == 'search') {
                    obj.action.fields.push(e2pdf.actions.getField('search', el, action_id, action));
                    obj.action.classes.push('e2pdf-w100');
                }

                obj.action.fields.push(e2pdf.actions.getField('change', el, action_id, action));
                obj.action.classes.push('e2pdf-w100 e2pdf-action-change');
                if (action.property == 'value') {
                    obj.action.fields.push(e2pdf.actions.getField('format', el, action_id, action));
                    obj.action.classes.push('e2pdf-w100 e2pdf-action-format');
                }
            }

            if (action && action.action == 'show') {
                obj.action.fields.push(e2pdf.actions.getField('else', el, action_id, action));
                obj.action.classes.push('e2pdf-w100');
            }

            if (el.data('data-type') == 'e2pdf-tpl') {
                if (action && action.action == 'restrict_process_shortcodes') {

                } else {
                    obj.action.fields.push(e2pdf.actions.getField('error_message', el, action_id, action));
                    obj.action.classes.push('e2pdf-w100 e2pdf-action-message');
                }
            }

            return obj;
        },
        /*
         * e2pdf.actions.renderField
         */
        renderField: function (el, action_id, action) {
            var conditions = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100 e2pdf-conditions'});
            if (action) {
                /*
                 * Backward compatibility for "Merge" option
                 */
                if (typeof action.action !== 'undefined' && action.action == 'merge') {
                    action.action = 'change';
                    action.format = 'insert_after';
                }
                for (var condition in action.conditions) {
                    conditions.append(e2pdf.actions.conditions.renderField(el, action_id, condition, action.conditions[condition]));
                }
            } else {
                conditions.append(e2pdf.actions.conditions.renderField(el, action_id, 1));
            }

            var groups = e2pdf.actions.getFields(el, action_id, action);
            if (groups) {
                for (var group_key in groups) {

                    var group = groups[group_key];
                    var grid = jQuery('<div>', {'class': 'e2pdf-grid'});
                    for (var field_key in group.fields) {
                        var group_field = group.fields[field_key];
                        var classes = '';
                        if (group.classes) {
                            if (group.classes[field_key]) {
                                classes = group.classes[field_key];
                            }
                        }

                        var field = '';
                        var label = '';
                        var wrap = '';
                        if (group_field.type === 'text') {
                            label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                            field = jQuery('<input>', {'type': 'text', 'class': 'e2pdf-w100', 'name': group_field.key, 'value': group_field.value});
                        } else if (group_field.type === 'hidden') {
                            field = jQuery('<input>', {'type': 'hidden', 'name': group_field.key, 'value': group_field.value});
                        } else if (group_field.type === 'textarea') {
                            label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                            field = jQuery('<textarea>', {'name': group_field.key, 'class': 'e2pdf-w100', 'rows': '5'}).val(group_field.value);
                        } else if (group_field.type === 'checkbox') {
                            wrap = jQuery('<label>', {'class': 'e2pdf-label e2pdf-small e2pdf-mt10'}).html(group_field.name);
                            field = jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-ib', 'name': group_field.key, 'value': group_field.option});
                            if (group_field.value == group_field.option) {
                                field.prop('checked', true);
                            }
                        } else if (group_field.type === 'color') {
                            wrap = jQuery('<div>', {'class': 'e2pdf-colorpicker-wr'});
                            label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                            field = jQuery('<input>', {'class': 'e2pdf-color-picker e2pdf-color-picker-load e2pdf-w100', 'type': 'text', 'name': group_field.key, 'value': group_field.value});
                            if (group_field.key === 'border_color') {
                                field.attr('data-default', '#000000');
                            }
                        } else if (group_field.type === 'select') {
                            label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                            field = jQuery('<select>', {'class': 'e2pdf-w100', 'name': group_field.key});
                            for (var option_key in group_field.options) {
                                field.append(jQuery('<option>', {'value': Object.keys(group_field.options[option_key])[0]}).html(Object.values(group_field.options[option_key])[0]));
                            }
                            field.val(group_field.value);
                        }

                        for (var att_key in group_field.atts) {
                            var att = group_field.atts[att_key];
                            switch (att) {
                                case 'readonly':
                                    field.attr('readonly', 'readonly');
                                    break;
                                case 'number':
                                    field.addClass('e2pdf-numbers e2pdf-number-negative e2pdf-number-positive');
                                    break;
                                case 'autocomplete':
                                    wrap = jQuery('<div>', {'class': 'e2pdf-rel e2pdf-w100'});
                                    field.addClass('e2pdf-autocomplete-cl');
                                    field.autocomplete({
                                        source: group_field.source,
                                        minLength: 0,
                                        appendTo: wrap,
                                        open: function () {
                                            jQuery(this).autocomplete("widget").addClass("e2pdf-autocomplete");
                                        },
                                        classes: {
                                            "ui-autocomplete": "e2pdf-autocomplete"
                                        }
                                    });
                                    break;
                            }
                        }

                        if (!wrap) {
                            wrap = field;
                        } else {
                            wrap.prepend(field);
                        }

                        grid.append(jQuery('<div>', {'class': 'e2pdf-ib ' + classes}).append(label, wrap));
                    }
                }
            }

            var new_action = jQuery("<div>", {'class': 'e2pdf-ib e2pdf-rel e2pdf-w100 e2pdf-action', 'data-action_id': action_id}).append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-duplicate'}).append(
                    jQuery('<i>', {'class': 'dashicons dashicons-admin-page'})
                    ),
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-link e2pdf-action-delete'}).append(
                    jQuery('<i>', {'class': 'dashicons dashicons-no'})
                    ),
                    jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(
                    grid
                    ),
                    conditions
                    );
            return new_action;
        },
        /*
         * e2pdf.actions.renderFields
         */
        renderFields: function (el) {

            var add_action = jQuery('<div>', {'class': 'e2pdf-action-add-wrapper'}).append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'button-primary button-small e2pdf-action-add'}).html(e2pdfLang['Add Action'])
                    );
            var block = jQuery('<div>', {'class': 'e2pdf-actions-wrapper e2pdf-mt5 e2pdf-w100'});
            var action_wrapper = jQuery('<div>', {'class': 'e2pdf-actions'});
            var actions = e2pdf.actions.get(el);
            for (var action in actions) {
                /*
                 * Backward compatiability Show Element / Page
                 */
                if (actions[action].action == 'show') {
                    if (typeof actions[action].else === 'undefined') {
                        actions[action].else = '';
                    }
                }
                action_wrapper.append(e2pdf.actions.renderField(el, action, actions[action]));
            }

            block.append(action_wrapper, add_action);
            return block;
        }
    },
    /*
     * e2pdf.properties
     */
    properties: {
        /*
         * e2pdf.properties.getLink
         */
        getLink: function (title, href, classes, collapse) {
            obj = {
                'name': title,
                'key': 'link',
                'type': 'link',
                'value': href,
                'classes': classes,
                'collapse': collapse,
                'atts': [
                    'collapse'
                ]
            };
            return obj;
        },
        /*
         * e2pdf.properties.getField
         */
        getField: function (field, el) {

            var obj = false;
            var properties = e2pdf.properties.get(el);
            var children = e2pdf.element.children(el);
            switch (field) {
                case 'element_id':
                    var value = el.attr('data-element_id');
                    obj = {
                        'name': e2pdfLang['ID'],
                        'key': 'element_id',
                        'type': 'text',
                        'value': value ? value : 0,
                        'atts': [
                            'readonly'
                        ]
                    };
                    break;
                case 'name':
                    var value = properties['name'];
                    obj = {
                        'name': e2pdfLang['Field Name'],
                        'key': 'name',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'field_name':
                    var value = properties['field_name'] && properties['field_name'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['As Field Name'],
                        'key': 'field_name',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'element_type':
                    var value = el.data('data-type');
                    obj = {
                        'name': e2pdfLang['Type'],
                        'key': 'element_type',
                        'type': 'text',
                        'value': value,
                        'atts': [
                            'readonly'
                        ]
                    };
                    break;
                case 'page_id':
                    if (el.data('data-type') == 'e2pdf-page') {
                        var value = el.attr('data-page_id');
                    } else {
                        var value = el.closest('.e2pdf-page').attr('data-page_id');
                    }
                    obj = {
                        'name': e2pdfLang['Page ID'],
                        'key': 'page_id',
                        'type': 'text',
                        'value': value ? value : 0,
                        'atts': [
                            'readonly',
                            'changeable',
                            'number'
                        ]
                    };
                    break;
                case 'width':
                    if (el.data('data-type') == 'e2pdf-page') {
                        var value = el.attr('data-width');
                    } else {
                        var value = e2pdf.helper.pxToFloat(el.css('width'));
                    }

                    obj = {
                        'name': e2pdfLang['Width'],
                        'key': 'width',
                        'type': 'text',
                        'value': value,
                        'atts': [
                            'number'
                        ]
                    };
                    if (el.data('data-type') == 'e2pdf-page') {
                        if (e2pdf.pdf.settings.get('pdf')) {
                            obj.atts.push('readonly');
                        }
                    }
                    break;
                case 'height':
                    if (el.data('data-type') == 'e2pdf-page') {
                        var value = el.attr('data-height');
                    } else {
                        var value = e2pdf.helper.pxToFloat(el.css('height'));
                    }

                    obj = {
                        'name': e2pdfLang['Height'],
                        'key': 'height',
                        'type': 'text',
                        'value': value,
                        'atts': [
                            'number'
                        ]
                    };
                    if (el.data('data-type') == 'e2pdf-page') {
                        if (e2pdf.pdf.settings.get('pdf')) {
                            obj.atts.push('readonly');
                        }
                    }
                    break;
                case 'top':
                    var value = parseFloat(el.css('top'));
                    obj = {
                        'name': e2pdfLang['Position Top'],
                        'key': 'top',
                        'type': 'text',
                        'value': value,
                        'atts': [
                            'number'
                        ]
                    };
                    break;
                case 'left':
                    var value = parseFloat(el.css('left'));
                    obj = {
                        'name': e2pdfLang['Position Left'],
                        'key': 'left',
                        'type': 'text',
                        'value': value,
                        'atts': [
                            'number'
                        ]
                    };
                    break;
                case 'dynamic_height':
                    var value = properties['dynamic_height'] && properties['dynamic_height'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Dynamic Height'],
                        'key': 'dynamic_height',
                        'type': 'checkbox',
                        'value': value,
                        'option': 1,
                        'atts': []
                    };
                    break;
                case 'multipage':
                    var value = properties['multipage'] && properties['multipage'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Multipage'],
                        'key': 'multipage',
                        'type': 'checkbox',
                        'value': value,
                        'option': 1,
                        'atts': []
                    };
                    break;
                case 'hide_if_empty':
                    var value = properties['hide_if_empty'] && properties['hide_if_empty'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Hide (If Empty)'],
                        'key': 'hide_if_empty',
                        'type': 'checkbox',
                        'value': value,
                        'option': 1,
                        'atts': []
                    };
                    break;
                case 'hide_page_if_empty':
                    var value = properties['hide_page_if_empty'] && properties['hide_page_if_empty'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Hide Page (If Empty)'],
                        'key': 'hide_page_if_empty',
                        'type': 'checkbox',
                        'value': value,
                        'option': 1,
                        'atts': []
                    };
                    break;
                case 'nl2br':
                    var value = properties['nl2br'] && properties['nl2br'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['New Lines to BR'],
                        'key': 'nl2br',
                        'type': 'checkbox',
                        'value': value,
                        'option': 1,
                        'atts': []
                    };
                    break;
                case 'text_color':
                    var value = properties['text_color'];
                    obj = {
                        'name': e2pdfLang['Font Color'],
                        'key': 'text_color',
                        'type': 'color',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'color':
                    var value = properties['color'];
                    obj = {
                        'name': e2pdfLang['Color'],
                        'key': 'color',
                        'type': 'color',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'text_type':
                    var value = properties['text_type'];
                    obj = {
                        'name': e2pdfLang['Type'],
                        'key': 'text_type',
                        'type': 'select',
                        'value': value,
                        'options': [
                            {'check': e2pdfLang['Check']},
                            {'circle': e2pdfLang['Circle']},
                            {'cross': e2pdfLang['Cross']},
                            {'diamond': e2pdfLang['Diamond']},
                            {'square': e2pdfLang['Square']},
                            {'star': e2pdfLang['Star']}
                        ],
                        'atts': []
                    };
                    break;
                case 'text_font':
                    var options = [];
                    jQuery('#e2pdf-wysiwyg-font').find('option').each(function () {
                        var option = {};
                        option[jQuery(this).attr('value')] = jQuery(this).html();
                        options.push(option);
                    });
                    var value = '';
                    if (properties['text_font']) {
                        value = properties['text_font'];
                    }
                    obj = {
                        'name': e2pdfLang['Font'],
                        'key': 'text_font',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    break;
                case 'text_auto_font_size':
                    var value = properties['text_auto_font_size'] && properties['text_auto_font_size'] == '1' ? '1' : '0';
                    if ((el.data('data-type') == 'e2pdf-textarea' || el.data('data-type') == 'e2pdf-input' || el.data('data-type') == 'e2pdf-select') && properties['text_font_size'] && properties['text_font_size'] == '-1') {
                        value = 1;
                    }
                    obj = {
                        'name': e2pdfLang['Auto Font Size'],
                        'key': 'text_auto_font_size',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'text_font_size':
                    var options = [];
                    jQuery('#e2pdf-wysiwyg-fontsize').find('option').each(function () {
                        var option = {};
                        option[jQuery(this).attr('value')] = jQuery(this).html();
                        options.push(option);
                        if (jQuery(this).attr('value') === '' && properties['text_font_size'] && properties['text_font_size'] == '-1') {
                            option = {};
                            option['-1'] = e2pdfLang['Auto'];
                            options.push(option);
                        }
                    });
                    var value = '';
                    if (properties['text_font_size']) {
                        value = properties['text_font_size'];
                    }
                    obj = {
                        'name': e2pdfLang['Font Size'],
                        'key': 'text_font_size',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    break;
                case 'text_line_height':
                    var options = [];
                    var value = '';
                    if (properties['text_line_height']) {
                        value = properties['text_line_height'];
                    }

                    var option = {};
                    option[''] = '-';
                    options.push(option);
                    jQuery('#e2pdf-line-height').find('option').each(function () {
                        var option = {};
                        option[jQuery(this).attr('value')] = jQuery(this).html();
                        options.push(option);
                    });
                    obj = {
                        'name': e2pdfLang['Line Height'],
                        'key': 'text_line_height',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    break;
                case 'text_letter_spacing':
                    var value = properties['text_letter_spacing'];
                    obj = {
                        'name': e2pdfLang['Char Spacing'],
                        'key': 'text_letter_spacing',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'z_index':
                    var value = properties['z_index'];
                    obj = {
                        'name': e2pdfLang['Z-index'],
                        'key': 'z_index',
                        'type': 'text',
                        'value': value,
                        'atts': ['number', 'number-negative']
                    };
                    break;
                case 'background':
                    var value = properties['background'];
                    obj = {
                        'name': e2pdfLang['Background'],
                        'key': 'background',
                        'type': 'color',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'border':
                    var value = properties['border'];
                    obj = {
                        'name': e2pdfLang['Border'],
                        'key': 'border',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'border_top':
                    var value = properties['border_top'];
                    obj = {
                        'name': e2pdfLang['Border Top'],
                        'key': 'border_top',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'border_left':
                    var value = properties['border_left'];
                    obj = {
                        'name': e2pdfLang['Border Left'],
                        'key': 'border_left',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'border_right':
                    var value = properties['border_right'];
                    obj = {
                        'name': e2pdfLang['Border Right'],
                        'key': 'border_right',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'border_bottom':
                    var value = properties['border_bottom'];
                    obj = {
                        'name': e2pdfLang['Border Bottom'],
                        'key': 'border_bottom',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'border_color':
                    var value = properties['border_color'];
                    obj = {
                        'name': e2pdfLang['Border Color'],
                        'key': 'border_color',
                        'type': 'color',
                        'value': value ? value : "#000000"
                    };
                    break;
                case 'padding_top':
                    var value = properties['padding_top'];
                    obj = {
                        'name': e2pdfLang['Padding Top'],
                        'key': 'padding_top',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'padding_left':
                    var value = properties['padding_left'];
                    obj = {
                        'name': e2pdfLang['Padding Left'],
                        'key': 'padding_left',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'padding_right':
                    var value = properties['padding_right'];
                    obj = {
                        'name': e2pdfLang['Padding Right'],
                        'key': 'padding_right',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'padding_bottom':
                    var value = properties['padding_bottom'];
                    obj = {
                        'name': e2pdfLang['Padding Bottom'],
                        'key': 'padding_bottom',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'margin_top':
                    var value = properties['margin_top'];
                    obj = {
                        'name': e2pdfLang['Margin Top'],
                        'key': 'margin_top',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'margin_left':
                    var value = properties['margin_left'];
                    obj = {
                        'name': e2pdfLang['Margin Left'],
                        'key': 'margin_left',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'margin_right':
                    var value = properties['margin_right'];
                    obj = {
                        'name': e2pdfLang['Margin Right'],
                        'key': 'margin_right',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'margin_bottom':
                    var value = properties['margin_bottom'];
                    obj = {
                        'name': e2pdfLang['Margin Bottom'],
                        'key': 'margin_bottom',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'length':
                    var value = properties['length'];
                    obj = {
                        'name': e2pdfLang['Length'],
                        'key': 'length',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'comb':
                    var value = properties['comb'] && properties['comb'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Comb'],
                        'key': 'comb',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'rtl':
                    var value = '';
                    if (properties['rtl']) {
                        value = properties['rtl'];
                    }
                    obj = {
                        'name': e2pdfLang['Direction'],
                        'key': 'rtl',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'': '-'},
                                    {'0': e2pdfLang['LTR']},
                                    {'1': e2pdfLang['RTL']}
                                ]
                    };
                    break;
                case 'required':
                    var value = properties['required'] && properties['required'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Required'],
                        'key': 'required',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'readonly':
                    var value = properties['readonly'] && properties['readonly'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Read-only'],
                        'key': 'readonly',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'pass':
                    var value = properties['pass'] && properties['pass'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Password'],
                        'key': 'pass',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'multiline':
                    var value = properties['multiline'] && properties['multiline'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Multiline'],
                        'key': 'multiline',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'dimension':
                    var value = properties['dimension'] && properties['dimension'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Keep Image Ratio'],
                        'key': 'dimension',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'block_dimension':
                    var value = properties['block_dimension'] && properties['block_dimension'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Lock Aspect Ratio'],
                        'key': 'block_dimension',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'keep_lower_size':
                    var value = properties['keep_lower_size'] && properties['keep_lower_size'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Keep Lower Size'],
                        'key': 'keep_lower_size',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'hl':
                    var value = properties['hl'] && properties['hl'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Hide Label'],
                        'key': 'hl',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'only_image':
                    var value = properties['only_image'] && properties['only_image'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Only Image'],
                        'key': 'only_image',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'esig':
                    var value = properties['esig'] && properties['esig'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['E-Signature'],
                        'key': 'esig',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'esig_contact':
                    var value = properties['esig_contact'];
                    obj = {
                        'name': e2pdfLang['Contact'],
                        'key': 'esig_contact',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'esig_location':
                    var value = properties['esig_location'];
                    obj = {
                        'name': e2pdfLang['Location'],
                        'key': 'esig_location',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'esig_reason':
                    var value = properties['esig_reason'];
                    obj = {
                        'name': e2pdfLang['Reason'],
                        'key': 'esig_reason',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'placeholder':
                    var value = properties['placeholder'];
                    obj = {
                        'name': e2pdfLang['Placeholder'],
                        'key': 'placeholder',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'horizontal':
                    var value = properties['horizontal'];
                    obj = {
                        'name': e2pdfLang['Horizontal Align'],
                        'key': 'horizontal',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'left': e2pdfLang['Left']},
                                    {'center': e2pdfLang['Center']},
                                    {'right': e2pdfLang['Right']}
                                ]
                        ,
                        'atts': []
                    };
                    break;
                case 'vertical':
                    var value = properties['vertical'];
                    obj = {
                        'name': e2pdfLang['Vertical Align'],
                        'key': 'vertical',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'top': e2pdfLang['Top']},
                                    {'middle': e2pdfLang['Middle']},
                                    {'bottom': e2pdfLang['Bottom']}
                                ]
                        ,
                        'atts': []
                    };
                    break;
                case 'scale':
                    var value = properties['scale'];
                    obj = {
                        'name': e2pdfLang['Scale'],
                        'key': 'scale',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'0': e2pdfLang['Auto']},
                                    {'1': e2pdfLang['Width&Height']},
                                    {'2': e2pdfLang['Width']},
                                    {'3': e2pdfLang['Height']}
                                ]
                        ,
                        'atts': ['scale']
                    };
                    break;
                case 'text_align':
                    var value = '';
                    if (properties['text_align']) {
                        value = properties['text_align'];
                    }
                    obj = {
                        'name': e2pdfLang['Text Align'],
                        'key': 'text_align',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'': '-'},
                                    {'left': e2pdfLang['Left']},
                                    {'center': e2pdfLang['Center']},
                                    {'right': e2pdfLang['Right']}
                                ]
                        ,
                        'atts': []
                    };
                    if (el.data('data-type') === 'e2pdf-textarea' || el.data('data-type') === 'e2pdf-html' || el.data('data-type') === 'e2pdf-page-number') {
                        obj.options.push(
                                {'justify': e2pdfLang['Justify']}
                        );
                    }
                    break;
                case 'precision':
                    var value = 'qrl';
                    if (properties['precision']) {
                        value = properties['precision'];
                    }
                    obj = {
                        'name': e2pdfLang['Precision'],
                        'key': 'precision',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'qrl': e2pdfLang['L - Smallest']},
                                    {'qrm': e2pdfLang['M - Medium']},
                                    {'qrq': e2pdfLang['Q - High']},
                                    {'qrh': e2pdfLang['H - Best']}
                                ]
                        ,
                        'atts': []
                    };
                    break;
                case 'wq':
                    var value = properties['wq'];
                    obj = {
                        'name': e2pdfLang['Quiet Zone Size'],
                        'key': 'wq',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'format':
                    var value = 'upc-a';
                    if (properties['format']) {
                        value = properties['format'];
                    }
                    obj = {
                        'name': e2pdfLang['Format'],
                        'key': 'format',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'upc-a': e2pdfLang['UPC-A']},
                                    {'upc-e': e2pdfLang['UPC-E']},
                                    {'ean-8': e2pdfLang['EAN-8']},
                                    {'ean-13': e2pdfLang['EAN-13']},
                                    {'ean-13-pad': e2pdfLang['EAN-13 PAD']},
                                    {'ean-13-nopad': e2pdfLang['EAN-13 NOPAD']},
                                    {'ean-128': e2pdfLang['EAN-128']},
                                    {'code-39': e2pdfLang['CODE-39']},
                                    {'code-39-ascii': e2pdfLang['CODE-39 ASCII']},
                                    {'code-93': e2pdfLang['CODE-93']},
                                    {'code-93-ascii': e2pdfLang['CODE-93 ASCII']},
                                    {'code-128': e2pdfLang['CODE-128']},
                                    {'codabar': e2pdfLang['CODEBAR']},
                                    {'itf': e2pdfLang['ITF']},
                                    {'dmtx': e2pdfLang['DMTX']},
                                    {'dmtx-s': e2pdfLang['DMTX S']},
                                    {'dmtx-r': e2pdfLang['DMTX R']},
                                    {'gs1-dmtx': e2pdfLang['GS1 DMTX']},
                                    {'gs1-dmtx-s': e2pdfLang['GS1 DMTX S']},
                                    {'gs1-dmtx-r': e2pdfLang['GS1 DMTX R']}
                                ]
                        ,
                        'atts': []
                    };
                    break;
                case 'rotation':
                    var value = properties['rotation'];
                    obj = {
                        'name': e2pdfLang['Rotation'],
                        'key': 'rotation',
                        'type': 'select',
                        'value': value,
                        'options':
                                [
                                    {'0': '0'},
                                    {'90': '90'},
                                    {'180': '180'},
                                    {'270': '270'}
                                ]
                        ,
                        'atts': []
                    };
                    break;
                case 'opacity':
                    var value = properties['opacity'];
                    obj = {
                        'name': e2pdfLang['Opacity'],
                        'key': 'opacity',
                        'type': 'text',
                        'value': value,
                        'atts': ['number']
                    };
                    break;
                case 'parent':
                    var value = properties['parent'];
                    var options = [];
                    var option = {
                        '': e2pdfLang['--- Select ---']
                    };
                    options.push(option);
                    if (el.data('data-type') === 'e2pdf-html') {
                        jQuery('#e2pdf-tpl').find('.e2pdf-html').each(function () {
                            if (!jQuery(this).is(children)) {
                                var parent = jQuery(this).parent().attr('data-element_id');
                                var option = {};
                                option[parent] = parent;
                                options.push(option);
                            }
                        });
                    }

                    obj = {
                        'name': e2pdfLang['Parent'],
                        'key': 'parent',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    break;
                case 'group':
                    var value = properties['group'];
                    var source = [
                    ];
                    jQuery('#e2pdf-tpl').find('.e2pdf-radio').each(function () {
                        if (!jQuery(this).is(children)) {
                            var radio = jQuery(this).parent();
                            var group = e2pdf.properties.getValue(radio, 'group');
                            if (source.indexOf(group) === -1) {
                                source.push(group);
                            }
                        }
                    });
                    obj = {
                        'name': e2pdfLang['Group'],
                        'key': 'group',
                        'type': 'text',
                        'value': value,
                        'source': source,
                        'atts': ['autocomplete']
                    };
                    break;
                case 'option':
                    var value = properties['option'];
                    obj = {
                        'name': e2pdfLang['Option'],
                        'key': 'option',
                        'type': 'textarea',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'options':
                    var value = properties['options'];
                    obj = {
                        'name': e2pdfLang['Options'],
                        'key': 'options',
                        'type': 'textarea',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'value':
                    value = '';
                    if (el.data('data-type') === 'e2pdf-html') {
                        if (properties['wysiwyg_disable'] == '1') {
                            value = children.val();
                        } else {
                            value = children.html();
                        }
                    } else if (el.data('data-type') === 'e2pdf-input' || el.data('data-type') === 'e2pdf-textarea') {
                        value = children.val();
                    } else {
                        value = properties['value'];
                    }

                    obj = {
                        'name': e2pdfLang['Value'],
                        'key': 'value',
                        'type': 'textarea',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'css':
                    value = properties['css'];
                    obj = {
                        'name': e2pdfLang['Css'],
                        'key': 'css',
                        'type': 'textarea',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'preset':
                    var value = '';
                    var options = [];
                    var option = {
                        '': e2pdfLang['--- Select ---']
                    };
                    options.push(option);
                    for (var size in e2pdfTemplateSizes) {
                        var option = {};
                        option[size] = size + ' (' + e2pdfTemplateSizes[size]['width'] + 'x' + e2pdfTemplateSizes[size]['height'] + ')';
                        options.push(option);
                    }

                    obj = {
                        'name': e2pdfLang['Size Preset'],
                        'key': 'preset',
                        'type': 'select',
                        'value': value,
                        'options': options,
                        'atts': []
                    };
                    if (e2pdf.pdf.settings.get('pdf')) {
                        obj.atts.push('disabled');
                    }

                    break;
                case 'highlight':
                    var value = properties['highlight'];
                    obj = {
                        'name': e2pdfLang['Highlight'],
                        'key': 'highlight',
                        'type': 'select',
                        'value': value,
                        'options': [
                            {'none': e2pdfLang['None']},
                            {'invert': e2pdfLang['Invert']},
                            {'outline': e2pdfLang['Outline']},
                            {'push': e2pdfLang['Push']}
                        ],
                        'atts': []
                    };
                    break;
                case 'preg_pattern':
                    var value = properties['preg_pattern'];
                    obj = {
                        'name': e2pdfLang['Preg Replace Pattern'],
                        'key': 'preg_pattern',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'preg_replacement':
                    var value = properties['preg_replacement'];
                    obj = {
                        'name': e2pdfLang['Preg Replace Replacement'],
                        'key': 'preg_replacement',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'preg_match_all_pattern':
                    var value = properties['preg_match_all_pattern'];
                    obj = {
                        'name': e2pdfLang['Preg Match All Pattern'],
                        'key': 'preg_match_all_pattern',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'preg_match_all_output':
                    var value = properties['preg_match_all_output'];
                    obj = {
                        'name': e2pdfLang['Preg Match All Output'],
                        'key': 'preg_match_all_output',
                        'type': 'text',
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'css_priority':
                    var value = properties['css_priority'] && properties['css_priority'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['CSS Priority'],
                        'key': 'css_priority',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
                case 'wysiwyg_disable':
                    var value = properties['wysiwyg_disable'] && properties['wysiwyg_disable'] == '1' ? '1' : '0';
                    obj = {
                        'name': e2pdfLang['Disable WYSIWYG Editor'],
                        'key': 'wysiwyg_disable',
                        'type': 'checkbox',
                        'option': 1,
                        'value': value,
                        'atts': []
                    };
                    break;
            }
            return obj;
        },
        /*
         * e2pdf.properties.getFields
         */
        getFields: function (el, actions) {

            if (el.data('data-type') === 'e2pdf-tpl') {
                var obj = {};
            } else if (el.data('data-type') === 'e2pdf-page') {
                var obj = {
                    'page_id': {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('page_id', el),
                            e2pdf.properties.getField('element_type', el)
                        ],
                        'position': 'top',
                        'classes': [
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pl10'
                        ]
                    },
                    'size': {
                        'name': e2pdfLang['Size'],
                        'fields': [
                            e2pdf.properties.getField('width', el),
                            e2pdf.properties.getField('height', el),
                            e2pdf.properties.getField('preset', el)
                        ],
                        'position': 'top',
                        'classes': [
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    }
                };
            } else {
                var obj = {
                    'element': {
                        'name': e2pdfLang['Element'],
                        'fields': [
                            e2pdf.properties.getField('element_id', el),
                            e2pdf.properties.getField('page_id', el),
                            e2pdf.properties.getField('element_type', el),
                            e2pdf.properties.getField('left', el),
                            e2pdf.properties.getField('top', el),
                            e2pdf.properties.getField('width', el),
                            e2pdf.properties.getField('height', el)
                        ],
                        'position': 'top',
                        'classes': [
                            'e2pdf-w25',
                            'e2pdf-w25 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w25',
                            'e2pdf-w25 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w25 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w25'
                        ]
                    }
                };
                if (el.data('data-type') === 'e2pdf-input') {

                    obj['element'].fields.push(e2pdf.properties.getField('name', el));
                    obj['element'].fields.push(e2pdf.properties.getField('field_name', el));
                    obj['element'].classes.push('e2pdf-w75 e2pdf-pr10');
                    obj['element'].classes.push('e2pdf-w25 e2pdf-mt-label');
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_letter_spacing', el),
                            e2pdf.properties.getField('text_auto_font_size', el),
                            e2pdf.properties.getField('text_align', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('length', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('comb', el),
                            e2pdf.properties.getField('required', el),
                            e2pdf.properties.getField('readonly', el),
                            e2pdf.properties.getField('pass', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-textarea') {

                    obj['element'].fields.push(e2pdf.properties.getField('name', el));
                    obj['element'].fields.push(e2pdf.properties.getField('field_name', el));
                    obj['element'].classes.push('e2pdf-w75 e2pdf-pr10');
                    obj['element'].classes.push('e2pdf-w25 e2pdf-mt-label');
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_letter_spacing', el),
                            e2pdf.properties.getField('text_auto_font_size', el),
                            e2pdf.properties.getField('text_line_height', el),
                            e2pdf.properties.getField('text_align', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('length', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('comb', el),
                            e2pdf.properties.getField('required', el),
                            e2pdf.properties.getField('readonly', el),
                            e2pdf.properties.getField('pass', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-checkbox') {

                    obj['element'].fields.push(e2pdf.properties.getField('name', el));
                    obj['element'].fields.push(e2pdf.properties.getField('field_name', el));
                    obj['element'].classes.push('e2pdf-w75 e2pdf-pr10');
                    obj['element'].classes.push('e2pdf-w25 e2pdf-mt-label');
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_type', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('required', el),
                            e2pdf.properties.getField('readonly', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('option', el),
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-strong-label',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-radio') {

                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_type', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('required', el),
                            e2pdf.properties.getField('readonly', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('group', el),
                            e2pdf.properties.getField('field_name', el),
                            e2pdf.properties.getField('option', el),
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w75 e2pdf-strong-label e2pdf-pr10',
                            'e2pdf-w25 e2pdf-mt-label',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-select') {

                    obj['element'].fields.push(e2pdf.properties.getField('name', el));
                    obj['element'].fields.push(e2pdf.properties.getField('field_name', el));
                    obj['element'].classes.push('e2pdf-w75 e2pdf-pr10');
                    obj['element'].classes.push('e2pdf-w25 e2pdf-mt-label');
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_letter_spacing', el),
                            e2pdf.properties.getField('text_auto_font_size', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('multiline', el),
                            e2pdf.properties.getField('required', el),
                            e2pdf.properties.getField('readonly', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('options', el),
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-strong-label',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-signature') {

                    obj['element'].fields.push(e2pdf.properties.getField('name', el));
                    obj['element'].fields.push(e2pdf.properties.getField('field_name', el));
                    obj['element'].classes.push('e2pdf-w75 e2pdf-pr10');
                    obj['element'].classes.push('e2pdf-w25 e2pdf-mt-label');
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('placeholder', el),
                            e2pdf.properties.getField('esig', el),
                            e2pdf.properties.getField('horizontal', el),
                            e2pdf.properties.getField('vertical', el),
                            e2pdf.properties.getField('dimension', el),
                            e2pdf.properties.getField('block_dimension', el),
                            e2pdf.properties.getField('keep_lower_size', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getField('only_image', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-html') {
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_letter_spacing', el),
                            e2pdf.properties.getField('text_line_height', el),
                            e2pdf.properties.getField('text_align', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('vertical', el),
                            e2pdf.properties.getField('rtl', el),
                            e2pdf.properties.getField('multipage', el),
                            e2pdf.properties.getField('dynamic_height', el),
                            e2pdf.properties.getField('nl2br', el),
                            e2pdf.properties.getField('hide_if_empty', el),
                            e2pdf.properties.getField('hide_page_if_empty', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('parent', el),
                            e2pdf.properties.getField('css', el),
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getField('wysiwyg_disable', el),
                            e2pdf.properties.getField('css_priority', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-strong-label',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w30 e2pdf-pr10',
                            'e2pdf-w30 e2pdf-pr10',
                            'e2pdf-w40 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-page-number') {
                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_letter_spacing', el),
                            e2pdf.properties.getField('text_line_height', el),
                            e2pdf.properties.getField('text_align', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('vertical', el),
                            e2pdf.properties.getField('rtl', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl'
                        ]
                    };
                    obj['value'] = {
                        'name': '',
                        'fields': [
                            e2pdf.properties.getField('css', el),
                            e2pdf.properties.getField('value', el),
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                            'e2pdf-w100 e2pdf-strong-label e2pdf-mt10',
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-image') {

                    obj['field'] = {
                        'name': e2pdfLang['Field'],
                        'fields': [
                            e2pdf.properties.getField('horizontal', el),
                            e2pdf.properties.getField('vertical', el),
                            e2pdf.properties.getField('rotation', el),
                            e2pdf.properties.getField('opacity', el),
                            e2pdf.properties.getField('dimension', el),
                            e2pdf.properties.getField('block_dimension', el),
                            e2pdf.properties.getField('keep_lower_size', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getField('only_image', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-qrcode') {

                    obj['qrcode'] = {
                        'name': e2pdfLang['QR Code'],
                        'fields': [
                            e2pdf.properties.getField('color', el),
                            e2pdf.properties.getField('precision', el),
                            e2pdf.properties.getField('wq', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('margin_top', el),
                            e2pdf.properties.getField('margin_left', el),
                            e2pdf.properties.getField('margin_right', el),
                            e2pdf.properties.getField('margin_bottom', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-barcode') {

                    obj['barcode'] = {
                        'name': e2pdfLang['Barcode'],
                        'fields': [
                            e2pdf.properties.getField('text_color', el),
                            e2pdf.properties.getField('text_font', el),
                            e2pdf.properties.getField('text_font_size', el),
                            e2pdf.properties.getField('text_line_height', el),
                            e2pdf.properties.getField('color', el),
                            e2pdf.properties.getField('format', el),
                            e2pdf.properties.getField('wq', el),
                            e2pdf.properties.getField('horizontal', el),
                            e2pdf.properties.getField('vertical', el),
                            e2pdf.properties.getField('scale', el),
                            e2pdf.properties.getField('dimension', el),
                            e2pdf.properties.getField('hl', el)
                        ],
                        'position': 'left',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w70',
                            'e2pdf-w30 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-w100',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w50',
                            'e2pdf-w50 e2pdf-pl10',
                            'e2pdf-w100',
                            'e2pdf-pr10',
                            'e2pdf-pr10'
                        ]
                    };
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('margin_top', el),
                            e2pdf.properties.getField('margin_left', el),
                            e2pdf.properties.getField('margin_right', el),
                            e2pdf.properties.getField('margin_bottom', el),
                            e2pdf.properties.getField('padding_top', el),
                            e2pdf.properties.getField('padding_left', el),
                            e2pdf.properties.getField('padding_right', el),
                            e2pdf.properties.getField('padding_bottom', el),
                            e2pdf.properties.getField('border_color', el),
                            e2pdf.properties.getField('border_top', el),
                            e2pdf.properties.getField('border_left', el),
                            e2pdf.properties.getField('border_right', el),
                            e2pdf.properties.getField('border_bottom', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'right',
                        'classes': [
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-pr10 e2pdf-fnl',
                            'e2pdf-w25 e2pdf-fnl',
                            'e2pdf-w100'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-rectangle') {
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('background', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pl10'
                        ]
                    };
                }

                if (el.data('data-type') === 'e2pdf-link') {
                    obj['style'] = {
                        'name': e2pdfLang['Style'],
                        'fields': [
                            e2pdf.properties.getField('highlight', el),
                            e2pdf.properties.getField('z_index', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w50 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pl10'
                        ]
                    };
                    obj['value'] = {
                        'name': e2pdfLang['Value'],
                        'fields': [
                            e2pdf.properties.getField('value', el),
                            e2pdf.properties.getLink("+ " + e2pdfLang['Preg Filters'], 'javascript:void(0);', 'e2pdf-collapse e2pdf-link', 'e2pdf-preg-filters'),
                            e2pdf.properties.getField('preg_pattern', el),
                            e2pdf.properties.getField('preg_replacement', el),
                            e2pdf.properties.getField('preg_match_all_pattern', el),
                            e2pdf.properties.getField('preg_match_all_output', el)
                        ],
                        'position': 'bottom',
                        'classes': [
                            'e2pdf-w100 e2pdf-hide-label',
                            'e2pdf-w100 e2pdf-align-right e2pdf-small e2pdf-mt6 e2pdf-pl10 e2pdf-pr10',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pr10 e2pdf-preg-filters e2pdf-hide',
                            'e2pdf-w50 e2pdf-pl10 e2pdf-preg-filters e2pdf-hide'
                        ]
                    };
                }
            }

            if (actions) {
                obj['actions'] = {
                    'name': e2pdfLang['Actions'],
                    'fields': e2pdf.actions.renderFields(el),
                    'position': 'bottom'
                };
            }

            return obj;
        },
        /*
         * e2pdf.properties.renderFields
         */
        renderFields: function (el) {

            var actions = true;
            var fields = jQuery('<div>', {'class': ' e2pdf-grid'}).append();
            var fields_top = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100 e2pdf-top'});
            var fields_left = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pr5 e2pdf-left'});
            var fields_right = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w50 e2pdf-pl5 e2pdf-right'});
            var fields_bottom = jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100 e2pdf-bottom'});
            if (el.data('data-type') == 'e2pdf-tpl') {
                fields_top = '';
                fields_left = '';
                fields_right = '';
            } else if (el.data('data-type') == 'e2pdf-page') {
                fields_left = '';
                fields_right = '';
            }

            var groups = e2pdf.properties.getFields(el, actions);
            if (groups) {
                for (var group_key in groups) {

                    if (group_key === 'actions') {

                        var group = groups[group_key];
                        var block = jQuery('<div>');
                        if (group.name) {
                            block.append(jQuery('<label>').html(group.name + ':'));
                        }
                        var grid = jQuery('<div>', {'class': 'e2pdf-grid'});
                        grid.append(group.fields);
                        block.append(grid);
                        if (group.position === 'top') {
                            fields_top.append(block);
                        } else if (group.position === 'left') {
                            fields_left.append(block);
                        } else if (group.position === 'right') {
                            fields_right.append(block);
                        } else {
                            fields_bottom.append(block);
                        }

                    } else {
                        var group = groups[group_key];
                        var block = jQuery('<div>');
                        if (group.name) {
                            block.append(jQuery('<label>').html(group.name + ':'));
                        }
                        var grid = jQuery('<div>', {'class': 'e2pdf-grid'});
                        for (var field_key in group.fields) {

                            var group_field = group.fields[field_key];
                            var classes = '';
                            if (group.classes) {
                                if (group.classes[field_key]) {
                                    classes = group.classes[field_key];
                                }
                            }

                            var field = '';
                            var label = '';
                            var wrap = '';
                            if (group_field.type === 'text') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<input>', {'type': 'text', 'class': 'e2pdf-w100', 'name': group_field.key, 'value': group_field.value});
                            } else if (group_field.type === 'hidden') {
                                field = jQuery('<input>', {'type': 'hidden', 'name': group_field.key, 'value': group_field.value});
                            } else if (group_field.type === 'textarea') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<textarea>', {'name': group_field.key, 'class': 'e2pdf-w100', 'rows': '5'}).val(group_field.value);
                            } else if (group_field.type === 'checkbox') {
                                wrap = jQuery('<label>', {'class': 'e2pdf-label e2pdf-small e2pdf-wauto'});
                                label = group_field.name;
                                field = jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-ib', 'name': group_field.key, 'value': group_field.option});
                                if (group_field.value == group_field.option) {
                                    field.prop('checked', true);
                                }
                            } else if (group_field.type === 'color') {
                                wrap = jQuery('<div>', {'class': 'e2pdf-colorpicker-wr'});
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<input>', {'class': 'e2pdf-color-picker e2pdf-color-picker-load e2pdf-w100', 'type': 'text', 'name': group_field.key, 'value': group_field.value});
                                if (group_field.key === 'border_color') {
                                    field.attr('data-default', '#000000');
                                }
                            } else if (group_field.type === 'select') {
                                label = jQuery('<div>', {'class': 'e2pdf-small e2pdf-label'}).html(group_field.name + ":");
                                field = jQuery('<select>', {'class': 'e2pdf-w100', 'name': group_field.key});
                                for (var option_key in group_field.options) {
                                    field.append(jQuery('<option>', {'value': Object.keys(group_field.options[option_key])[0]}).html(Object.values(group_field.options[option_key])[0]));
                                }
                                field.val(group_field.value);
                            } else if (group_field.type === 'link') {
                                field = jQuery('<a>', {'href': group_field.value, 'class': group_field.classes}).append(group_field.name);
                            }

                            for (var att_key in group_field.atts) {
                                var att = group_field.atts[att_key];
                                switch (att) {
                                    case 'readonly':
                                        field.attr('readonly', 'readonly');
                                        break;
                                    case 'disabled':
                                        field.attr('disabled', 'disabled');
                                        break;
                                    case 'number':
                                        field.addClass('e2pdf-numbers');
                                        break;
                                    case 'number-negative':
                                        field.addClass('e2pdf-number-negative');
                                        break;
                                    case 'autocomplete':
                                        wrap = jQuery('<div>', {'class': 'e2pdf-rel e2pdf-w100'});
                                        field.addClass('e2pdf-autocomplete-cl');
                                        field.autocomplete({
                                            source: group_field.source,
                                            minLength: 0,
                                            appendTo: wrap,
                                            open: function () {
                                                jQuery(this).autocomplete("widget").addClass("e2pdf-autocomplete");
                                            },
                                            classes: {
                                                "ui-autocomplete": "e2pdf-autocomplete"
                                            }
                                        });
                                        break;
                                    case 'collapse':
                                        field.attr('data-collapse', group_field.collapse);
                                        break;
                                }
                            }

                            if (!wrap) {
                                wrap = field;
                            } else {
                                wrap.prepend(field);
                            }

                            if (group_field.type === 'checkbox') {
                                wrap.append(" " + label);
                                grid.append(jQuery('<div>', {'class': 'e2pdf-ib ' + classes}).append(wrap));
                            } else {
                                grid.append(jQuery('<div>', {'class': 'e2pdf-ib ' + classes}).append(label, wrap));
                            }
                        }

                        block.append(grid);
                        if (group.position === 'top') {
                            fields_top.append(block);
                        } else if (group.position === 'left') {
                            fields_left.append(block);
                        } else if (group.position === 'right') {
                            fields_right.append(block);
                        } else {
                            fields_bottom.append(block);
                        }
                    }
                }
            }

            fields.append(fields_top, fields_left, fields_right, fields_bottom);
            return fields;
        },
        /*
         * e2pdf.properties.apply
         */
        apply: function (el, data) {
            el.data('data-properties', JSON.stringify(data));
        },
        /*
         * e2pdf.properties.set
         */
        set: function (el, key, value) {
            var properties = e2pdf.properties.get(el);
            properties[key] = value;
            e2pdf.properties.apply(el, properties);
        },
        /*
         * e2pdf.properties.getValue
         */
        getValue: function (el, key) {
            var properties = e2pdf.properties.get(el);
            if (el.data('data-type') === 'e2pdf-page-number' && key == 'value') {
                return e2pdf.helper.toHtml(properties[key]);
            } else {
                return properties[key];
            }
        },
        /*
         * e2pdf.properties.get
         */
        get: function (el, submit) {
            var properties = [];
            if (typeof el.data('data-properties') !== 'undefined') {
                properties = JSON.parse(el.data('data-properties'));
                if (el.data('data-type') === 'e2pdf-page') {
                    if (submit) {
                        properties['width'] = el.attr('data-width');
                        properties['height'] = el.attr('data-height');
                        delete properties['page_id'];
                        delete properties['element_type'];
                        delete properties['preset'];
                    }
                } else {
                    if (submit) {
                        delete properties['width'];
                        delete properties['height'];
                        delete properties['value'];
                        delete properties['top'];
                        delete properties['left'];
                        delete properties['name'];
                        delete properties['element_type'];
                        delete properties['element_id'];
                        delete properties['page_id'];
                    } else {
                        if (!("width" in properties)) {
                            properties['width'] = parseFloat(el.css('width'));
                        } else {
                            properties['width'] = parseFloat(properties['width']);
                        }

                        if (!("height" in properties)) {
                            properties['height'] = parseFloat(el.css('height'));
                        } else {
                            properties['height'] = parseFloat(properties['height']);
                        }

                        if (!("top" in properties)) {
                            properties['top'] = parseFloat(el.css('top'));
                        } else {
                            properties['top'] = parseFloat(properties['top']);
                        }

                        if (!("left" in properties)) {
                            properties['left'] = parseFloat(el.css('left'));
                        } else {
                            properties['left'] = parseFloat(properties['left']);
                        }
                    }
                }
            }

            return properties;
        },
        /*
         * e2pdf.properties.render
         */
        render: function (el) {
            var properties = e2pdf.properties.get(el);
            var children = e2pdf.element.children(el);
            if (properties.hasOwnProperty('options')) {
                if (el.data('data-type') === 'e2pdf-select') {
                    children.find('option').remove();
                    var options = properties['options'].split("\n");
                    if (typeof options !== 'undefined' && options.length > 0) {
                        for (var key in options) {
                            children.append(
                                    jQuery('<option>', {'value': options[key].trim()}).html(options[key].trim())
                                    );
                        }
                    }
                }
            }

            if (el.data('data-type') === 'e2pdf-html') {
                if (children.is('textarea') && ((!properties.hasOwnProperty('wysiwyg_disable')) || (properties.hasOwnProperty('wysiwyg_disable') && properties['wysiwyg_disable'] != '1'))) {
                    children.replaceWith(jQuery('<div>', {'contenteditable': true, 'class': 'content e2pdf-html'}));
                    children = e2pdf.element.children(el);
                } else if (children.is('div') && (properties.hasOwnProperty('wysiwyg_disable') && properties['wysiwyg_disable'] == '1')) {
                    children.replaceWith(jQuery('<textarea>', {'contenteditable': true, 'class': 'content e2pdf-html'}));
                    children = e2pdf.element.children(el);
                }
            }

            if (properties.hasOwnProperty('value')) {
                if (el.data('data-type') === 'e2pdf-html') {
                    if (properties.hasOwnProperty('wysiwyg_disable') && properties['wysiwyg_disable'] == '1') {
                        children.val(properties['value']);
                    } else {
                        children.html(properties['value']);
                    }
                } else if (el.data('data-type') === 'e2pdf-page-number') {
                    children.html(properties['value'].replace('[e2pdf-page-number]', '1').replace('[e2pdf-page-total]', '2'));
                } else if (el.data('data-type') === 'e2pdf-input') {
                    children.val(properties['value']);
                } else if (el.data('data-type') === 'e2pdf-textarea') {
                    children.val(properties['value']);
                } else if (el.data('data-type') === 'e2pdf-select') {
                    children.val(properties['value']);
                } else if (el.data('data-type') === 'e2pdf-checkbox') {
                    if (properties['value'] == e2pdf.properties.getValue(el, 'option')) {
                        children.prop('checked', true);
                    } else {
                        children.prop('checked', false);
                    }
                } else if (el.data('data-type') === 'e2pdf-image') {
                    e2pdf.helper.image.load(el);
                } else if (el.data('data-type') === 'e2pdf-qrcode') {
                    e2pdf.helper.image.load(el);
                } else if (el.data('data-type') === 'e2pdf-barcode') {
                    e2pdf.helper.image.load(el);
                } else if (el.data('data-type') === 'e2pdf-signature') {
                    e2pdf.helper.image.load(el);
                }
            }

            if (properties.hasOwnProperty('group')) {
                jQuery('#e2pdf-tpl').find('.e2pdf-radio').each(function () {
                    var radio = jQuery(this).parent();
                    var group = e2pdf.properties.getValue(radio, 'group');
                    if (group === properties['group']) {
                        e2pdf.properties.set(radio, 'readonly', properties['readonly']);
                        e2pdf.properties.set(radio, 'required', properties['required']);
                        e2pdf.properties.set(radio, 'value', properties['value']);
                        var option = e2pdf.properties.getValue(radio, 'option');
                        if (properties['value'] === option) {
                            jQuery(this).prop('checked', true);
                        } else {
                            jQuery(this).prop('checked', false);
                        }
                    }
                });
            }

            if (el.data('data-type') === 'e2pdf-select') {
                if (properties.hasOwnProperty('multiline') && properties['multiline'] == '1') {
                    children.attr('multiple', true);
                } else {
                    children.attr('multiple', false);
                }
            }

            if (properties.hasOwnProperty('z_index')) {
                el.css('z-index', properties['z_index']);
            }

            if (properties.hasOwnProperty('opacity') && el.data('data-type') === 'e2pdf-image') {
                children.css('opacity', properties['opacity']);
            }

            if (properties.hasOwnProperty('locked') && properties['locked'] == '1') {
                el.addClass('e2pdf-locked');
            }

            if (el.data('data-type') === 'e2pdf-select'
                    || el.data('data-type') === 'e2pdf-input'
                    || el.data('data-type') === 'e2pdf-textarea'
                    || el.data('data-type') === 'e2pdf-html'
                    || el.data('data-type') === 'e2pdf-page-number') {
                if (properties.hasOwnProperty('rtl')) {
                    if (properties['rtl'] == '0') {
                        children.attr('dir', 'ltr');
                    } else if (properties['rtl'] == '1') {
                        children.attr('dir', 'rtl');
                    } else {
                        children.attr('dir', false);
                    }
                }
            }

            if (properties.hasOwnProperty('background')) {
                if (el.data('data-type') === 'e2pdf-radio'
                        || el.data('data-type') === 'e2pdf-checkbox'
                        ) {
                    children.css('background', properties['background']);
                } else {
                    el.css('background', properties['background']);
                }
            }

            if (properties.hasOwnProperty('border_top')) {
                if (properties['border_top'] != '0') {
                    el.css('border-top', properties['border_top'] + 'px solid ' + properties['border_color']);
                } else {
                    el.css('border-top', '');
                }
            }

            if (properties.hasOwnProperty('border_left')) {
                if (properties['border_left'] != '0') {
                    el.css('border-left', properties['border_left'] + 'px solid ' + properties['border_color']);
                } else {
                    el.css('border-left', '');
                }
            }

            if (properties.hasOwnProperty('border_right')) {
                if (properties['border_right'] != '0') {
                    el.css('border-right', properties['border_right'] + 'px solid ' + properties['border_color']);
                } else {
                    el.css('border-right', '');
                }
            }

            if (properties.hasOwnProperty('border_bottom')) {
                if (properties['border_bottom'] != '0') {
                    el.css('border-bottom', properties['border_bottom'] + 'px solid ' + properties['border_color']);
                } else {
                    el.css('border-bottom', '');
                }
            }

            if (properties.hasOwnProperty('padding_top')) {
                el.css('padding-top', properties['padding_top'] + 'px');
            }

            if (properties.hasOwnProperty('padding_left')) {
                el.css('padding-left', properties['padding_left'] + 'px');
            }

            if (properties.hasOwnProperty('padding_right')) {
                el.css('padding-right', properties['padding_right'] + 'px');
            }

            if (properties.hasOwnProperty('padding_bottom')) {
                el.css('padding-bottom', properties['padding_bottom'] + 'px');
            }

            if (properties.hasOwnProperty('border')) {
                if (el.data('data-type') === 'e2pdf-input'
                        || el.data('data-type') === 'e2pdf-textarea'
                        || el.data('data-type') === 'e2pdf-select'
                        || el.data('data-type') === 'e2pdf-radio'
                        || el.data('data-type') === 'e2pdf-checkbox'
                        ) {
                    if (properties['border'] != '0') {
                        children.css('border', properties['border'] + 'px solid ' + properties['border_color']);
                    } else {
                        children.css('border', '');
                    }
                }
            }

            if (properties.hasOwnProperty('text_color')) {
                if (el.data('data-type') === 'e2pdf-html' || el.data('data-type') === 'e2pdf-page-number') {
                    el.css('color', properties['text_color']);
                } else if (el.data('data-type') === 'e2pdf-input'
                        || el.data('data-type') === 'e2pdf-textarea'
                        || el.data('data-type') === 'e2pdf-select'
                        || el.data('data-type') === 'e2pdf-radio'
                        || el.data('data-type') === 'e2pdf-checkbox'
                        ) {
                    children.css('color', properties['text_color']);
                }
            }

            if (properties.hasOwnProperty('text_font')) {
                if (properties['text_font'] && properties['text_font'] !== "") {
                    var path = jQuery('#e2pdf-wysiwyg-font').find("[value='" + properties['text_font'] + "']").attr('path');
                    var tmp = jQuery('<div>', {'name': properties['text_font'], 'path': path});
                    e2pdf.font.load(tmp);
                    el.css('font-family', properties['text_font']);
                } else {
                    el.css('font-family', '');
                }
            }

            if (properties.hasOwnProperty('text_font_size')) {
                if (properties['text_font_size'] !== '') {
                    el.css('font-size', properties['text_font_size'] + "px");
                } else {
                    el.css('font-size', '');
                }
            }

            if (properties.hasOwnProperty('text_letter_spacing')) {
                if (properties['text_letter_spacing'] !== '') {
                    children.css('letter-spacing', properties['text_letter_spacing'] + "px");
                } else {
                    children.css('letter-spacing', '');
                }
            }

            if (properties.hasOwnProperty('text_line_height')) {
                /*
                 * Backward compatiability with input
                 */
                if (properties['text_line_height'] !== '' && properties['text_line_height'] !== '0') {
                    if (el.data('data-type') === 'e2pdf-textarea') {
                        children.css('line-height', properties['text_line_height'] + "px");
                    } else {
                        el.css('line-height', properties['text_line_height'] + "px");
                    }
                } else {
                    if (el.data('data-type') === 'e2pdf-textarea') {
                        children.css('line-height', '');
                    } else {
                        el.css('line-height', '');
                    }
                }
            }

            if (properties.hasOwnProperty('top')) {
                var page_height = parseFloat(el.closest('.e2pdf-page').css('height'));
                if ((parseFloat(properties['top']) + parseFloat(el.css('height'))) > page_height) {
                    var top = page_height - parseFloat(el.css('height'));
                    el.css('top', top + "px");
                } else if (properties['top'] >= 0) {
                    el.css('top', properties['top'] + "px");
                }
            }

            if (properties.hasOwnProperty('left')) {
                var page_width = parseFloat(el.closest('.e2pdf-page').css('width'));
                if ((parseFloat(properties['left']) + parseFloat(el.css('width'))) > page_width) {
                    var left = page_width - parseFloat(el.css('width'));
                    el.css('left', left + "px");
                } else if (properties['left'] >= 0) {
                    el.css('left', properties['left'] + "px");
                }
            }

            if (properties.hasOwnProperty('text_align')) {
                if (properties['text_align'] === '') {
                    children.css('text-align', jQuery('#e2pdf-text-align').val());
                } else {
                    children.css('text-align', properties['text_align']);
                }
            }

            if (properties.hasOwnProperty('width')) {
                var width = parseFloat(properties['width']);
                var left = parseFloat(el.css('left'));
                var page_width = parseFloat(el.closest('.e2pdf-page').css('width'));
                if (width > 0) {
                    if (width > page_width - left) {
                        el.css('width', page_width - left);
                        e2pdf.properties.set(el, 'width', page_width - left);
                    } else {
                        el.css('width', properties['width']);
                    }
                }
            }

            if (properties.hasOwnProperty('height')) {
                var height = parseFloat(properties['height']);
                var top = parseFloat(el.css('top'));
                var page_height = parseFloat(el.closest('.e2pdf-page').css('height'));
                if (height > 0) {
                    if (height > page_height - top) {
                        el.css('height', page_height - top);
                        e2pdf.properties.set(el, 'width', page_height - top);
                    } else {
                        el.css('height', properties['height']);
                    }
                }
            }
        }
    },
    /*
     * e2pdf.welcomeScreen
     */
    welcomeScreen: function () {
        if (jQuery('.e2pdf-page').length === 0) {
            var el = jQuery('<div>', {'data-modal': 'welcome-screen'});
            e2pdf.dialog.create(el);
        }
    },
    /*
     * e2pdf.createPdf
     */
    createPdf: function (el) {
        var item = false;
        var item1 = false;
        var item2 = false;
        var action = el.attr('data-action');
        var data = e2pdf.form.serializeObject(el.closest('form'));
        var disabled_settings = [
            'title', 'preset', 'font', 'font_size', 'line_height'
        ];
        for (var key in data) {
            if (jQuery.inArray(key, disabled_settings) === -1) {
                if (key == 'activated') {
                    e2pdf.pdf.settings.change(key, data[key]);
                } else {
                    e2pdf.pdf.settings.change(key, data[key]);
                }
            }

            if (key === 'font') {
                jQuery('#e2pdf-font').val(data[key]);
            }

            if (key === 'font_size') {
                jQuery('#e2pdf-font-size').val(data[key]);
            }

            if (key === 'line_height') {
                jQuery('#e2pdf-line-height').val(data[key]);
            }

            if (key === 'title') {
                jQuery('#e2pdf-title').val(data[key]);
            }

            if (key === 'text_align') {
                jQuery('#e2pdf-text-align').val(data[key]).trigger('change');
            }

            if (key === 'rtl') {
                jQuery('#e2pdf-rtl').prop('checked', true).trigger('change');
            }
        }

        if (!data['rtl']) {
            jQuery('#e2pdf-rtl').prop('checked', false).trigger('change');
        }

        if (action === 'apply') {
            var width = parseFloat(el.closest('form').find('input[name="width"]').val());
            var height = parseFloat(el.closest('form').find('input[name="height"]').val());
            var option = el.closest('form').find('#e2pdf-item option:selected');
            if (option && typeof option.data('data-item') !== 'undefined') {
                item = option.data('data-item');
            }

            if (item && item.id == '-1') {
                if (!confirm(e2pdfLang['All Field Values will be overwritten! Are you sure want to continue?'])) {
                    return false;
                }
                el.attr('form-id', 'e2pdf-build-form');
                el.attr('action', 'e2pdf_save_form');
                e2pdf.static.unsaved = false;
                e2pdf.request.submitForm(el);
                return;
            } else {
                if (item && item.id == '-2') {
                    var option1 = el.closest('form').find('#e2pdf-item1 option:selected');
                    if (option1 && typeof option1.data('data-item') !== 'undefined') {
                        item1 = option1.data('data-item');
                        if (item1.id == '-1') {
                            item1 = false;
                        }
                    }

                    var option2 = el.closest('form').find('#e2pdf-item2 option:selected');
                    if (option2 && typeof option2.data('data-item') !== 'undefined') {
                        item2 = option2.data('data-item');
                        if (item2.id == '-1') {
                            item2 = false;
                        }
                    }
                }

                e2pdf.pages.changeTplSize(width, height);
                jQuery('.ui-dialog-content').dialog('close');
            }
        } else if (action === 'empty') {
            var width = parseFloat(el.closest('form').find('input[name="width"]').val());
            var height = parseFloat(el.closest('form').find('input[name="height"]').val());
            var option = el.closest('form').find('#e2pdf-item option:selected');
            if (option && typeof option.data('data-item') !== 'undefined') {
                item = option.data('data-item');
                if (item.id == '-1') {
                    item = false;
                }
            }

            if (item && item.id == '-2') {
                var option1 = el.closest('form').find('#e2pdf-item1 option:selected');
                if (option1 && typeof option1.data('data-item') !== 'undefined') {
                    item1 = option1.data('data-item');
                    if (item1.id == '-1') {
                        item1 = false;
                    }
                }

                var option2 = el.closest('form').find('#e2pdf-item2 option:selected');
                if (option2 && typeof option2.data('data-item') !== 'undefined') {
                    item2 = option2.data('data-item');
                    if (item2.id == '-1') {
                        item2 = false;
                    }
                }
            }

            e2pdf.pages.changeTplSize(width, height);
            e2pdf.pages.createPage();
            jQuery('.ui-dialog-content').dialog('close');
        } else if (action === 'auto') {
            var extension = el.closest('form').find('#e2pdf-extension').val();
            var option = el.closest('form').find('#e2pdf-item option:selected');
            if (option && typeof option.data('data-item') !== 'undefined') {
                item = option.data('data-item');
                if (item.id == '-1') {
                    item = false;
                }
            }

            if (item && item.id == '-2') {
                var option1 = el.closest('form').find('#e2pdf-item1 option:selected');
                if (option1 && typeof option1.data('data-item') !== 'undefined') {
                    item1 = option1.data('data-item');
                    if (item1.id == '-1') {
                        item1 = false;
                    }
                }

                var option2 = el.closest('form').find('#e2pdf-item2 option:selected');
                if (option2 && typeof option2.data('data-item') !== 'undefined') {
                    item2 = option2.data('data-item');
                    if (item2.id == '-1') {
                        item2 = false;
                    }
                }
            }

            var data = {};
            data['extension'] = extension;
            data['item'] = item ? item.id : '';
            data['item1'] = item1 ? item1.id : '';
            data['item2'] = item2 ? item2.id : '';
            data['font_size'] = el.closest('form').find('select[name="font_size"]').val();
            data['line_height'] = el.closest('form').find('select[name="line_height"]').val();
            e2pdf.request.submitRequest('e2pdf_auto', el, data);
        } else if (action === 'upload') {
            if (e2pdf.pdf.settings.get('ID')) {
                if (!confirm(e2pdfLang['Saved Template will be overwritten! Are you sure want to continue?'])) {
                    return false;
                }
            }
            jQuery('#e2pdf-upload-pdf').click();
        }

        if (action === 'apply' || action === 'empty' || action === 'auto') {
            var link = jQuery('<a>', {
                'href': 'javascript:void(0);',
                'class': 'e2pdf-link e2pdf-modal',
                'data-modal': 'tpl-options'
            }).html(e2pdfLang['None']);
            if (item && item.id) {
                if (item.id == '-2') {
                    if (item1 || item2) {

                        var link = jQuery('<span>');
                        if (item1 && item1.id) {
                            link.append(jQuery('<a>', {
                                'target': '_blank',
                                'href': item1.url,
                                'class': 'e2pdf-link'
                            }).html(item1.name));
                        }
                        if (item2 && item2.id) {
                            if (item1 && item1.id) {
                                link.append(', ');
                            }
                            link.append(jQuery('<a>', {
                                'target': '_blank',
                                'href': item2.url,
                                'class': 'e2pdf-link'
                            }).html(item2.name));
                        }
                    }

                } else {
                    link = jQuery('<a>', {
                        'target': '_blank',
                        'href': item.url,
                        'class': 'e2pdf-link'
                    }).html(item.name);
                }
            }
            jQuery('#e2pdf-post-item').html(link);
        }

        jQuery('#e2pdf-tpl').data('data-type', 'e2pdf-tpl');
        e2pdf.font.load(jQuery('#e2pdf-font'));
        e2pdf.font.apply(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font'));
        e2pdf.font.size(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font-size'));
        e2pdf.font.line(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-line-height'));
        e2pdf.font.fontcolor(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font-color'));
        e2pdf.event.fire('after.createPdf');
    },
    /*
     * e2pdf.pages
     */
    pages: {
        /*
         * e2pdf.pages.rebuildPages
         */
        rebuildPages: function () {
            jQuery('.e2pdf-page').each(function (index) {
                if (!e2pdf.pdf.settings.get('pdf')) {
                    if (index + 1 === 1) {
                        jQuery(this).find('.e2pdf-up-page').attr('disabled', 'disabled');
                    } else {
                        jQuery(this).find('.e2pdf-up-page').attr('disabled', false);
                    }

                    if (index + 1 === jQuery('.e2pdf-page').length) {
                        jQuery(this).find('.e2pdf-down-page').attr('disabled', 'disabled');
                    } else {
                        jQuery(this).find('.e2pdf-down-page').attr('disabled', false);
                    }
                }
                jQuery(this).attr('data-page_id', index + 1);
            });
            e2pdf.welcomeScreen();
        },
        /*
         * e2pdf.pages.createPage
         */
        createPage: function (page, properties, actions) {
            e2pdf.pages.rebuildPages();
            var newpage = true;
            if (page) {
                var newpage = false;
            }

            if (!properties) {
                var properties = {};
            }

            if (!actions) {
                var actions = {};
            }

            if (newpage) {
                var page_id = parseInt(jQuery('.e2pdf-page').length) + 1;
                var page = jQuery('<div>', {
                    'class': 'e2pdf-page ui-droppable',
                    'width': jQuery('.e2pdf-tpl').attr('data-width'),
                    'height': jQuery('.e2pdf-tpl').attr('data-height'),
                    'data-width': jQuery('.e2pdf-tpl').attr('data-width'),
                    'data-height': jQuery('.e2pdf-tpl').attr('data-height')
                }).attr('data-page_id', page_id).append(
                        jQuery('<div>', {'class': 'page-options-icons'}).append(
                        jQuery('<a>', {
                            'href': 'javascript:void(0);',
                            'class': 'page-options-icon e2pdf-up-page e2pdf-link'
                        }).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-arrow-up-alt2'})
                        ),
                        jQuery('<a>', {
                            'href': 'javascript:void(0);',
                            'class': 'page-options-icon e2pdf-down-page e2pdf-link'
                        }).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-arrow-down-alt2'})
                        ),
                        jQuery('<a>', {
                            'href': 'javascript:void(0);',
                            'class': 'page-options-icon e2pdf-page-options e2pdf-modal e2pdf-link',
                            'data-modal': 'page-options'
                        }).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-admin-generic'})
                        ),
                        jQuery('<a>', {
                            'href': 'javascript:void(0);',
                            'class': 'page-options-icon e2pdf-delete-page e2pdf-link'
                        }).append(
                        jQuery('<i>', {'class': 'dashicons dashicons-no'})
                        )
                        ),
                        jQuery('<div>', {'class': 'e2pdf-guide e2pdf-guide-h'}),
                        jQuery('<div>', {'class': 'e2pdf-guide e2pdf-guide-v'})
                        );
            }

            page.data('data-type', 'e2pdf-page');
            e2pdf.properties.apply(page, properties);
            e2pdf.actions.apply(page, actions);
            page.droppable({
                over: function (ev, ui) {

                    e2pdf.static.drag.page = jQuery(this);
                    e2pdf.static.guide.guides = [];
                    if ((jQuery(ui.draggable).attr('data-type') == 'e2pdf-qrcode' || jQuery(ui.draggable).attr('data-type') == 'e2pdf-barcode' || jQuery(ui.draggable).attr('data-type') == 'e2pdf-signature' || jQuery(ui.draggable).attr('data-type') == 'e2pdf-image') && !jQuery(ui.helper).data('original-width') && (jQuery(ui.helper).width() > e2pdf.static.drag.page.width() || jQuery(ui.helper).height() > e2pdf.static.drag.page.height())) {
                        jQuery(ui.helper).data('original-width', jQuery(ui.helper).width());
                        jQuery(ui.helper).data('original-height', jQuery(ui.helper).height());
                        var coeff = 1;
                        if (jQuery(ui.helper).width() > e2pdf.static.drag.page.width()) {
                            coeff = e2pdf.static.drag.page.width() / jQuery(ui.helper).width();
                        } else if (jQuery(ui.helper).height() > e2pdf.static.drag.page.height()) {
                            coeff = e2pdf.static.drag.page.height() / jQuery(ui.helper).height();
                        }
                        jQuery(ui.helper).width(jQuery(ui.helper).width() * coeff);
                        jQuery(ui.helper).height(jQuery(ui.helper).height() * coeff);
                    }

                    if (ui.draggable.hasClass('e2pdf-clone')) {
                        jQuery(this).find(".e2pdf-element").each(function () {
                            e2pdf.static.guide.guides = jQuery.merge(e2pdf.static.guide.guides, e2pdf.guide.calc(jQuery(this), null, null, null, true));
                        });
                        e2pdf.static.guide.guides = jQuery.merge(e2pdf.static.guide.guides, e2pdf.guide.calc(e2pdf.static.drag.page, null, null, null, true));
                    } else {
                        e2pdf.static.guide.guides = jQuery.map(jQuery(this).find(".e2pdf-element").not('.e2pdf-selected'), e2pdf.guide.calc);
                        e2pdf.static.guide.guides = jQuery.merge(e2pdf.static.guide.guides, e2pdf.guide.calc(e2pdf.static.drag.page, null, null, null, false));
                    }
                },
                out: function (ev, ui) {
                    e2pdf.static.drag.page = null;
                    e2pdf.static.guide.guides = [];
                    if (jQuery(ui.helper).data('original-width')) {
                        jQuery(ui.helper).width(jQuery(ui.helper).data('original-width'));
                        jQuery(ui.helper).height(jQuery(ui.helper).data('original-height'));
                        jQuery(ui.helper).removeData('original-width');
                        jQuery(ui.helper).removeData('original-height');
                    }

                },
                deactivate: function (ev) {
                    e2pdf.static.drag.page = null;
                    e2pdf.static.guide.guides = [];
                },
                drop: function (ev, ui) {
                    if (ui.draggable.hasClass('e2pdf-clone')) {
                        var type = jQuery(ui.draggable).attr('data-type');
                        var page = jQuery(this).closest('.e2pdf-page');
                        var pos = {
                            top: Math.max(0, (jQuery(ui.helper).offset().top - jQuery(this).offset().top) / e2pdf.zoom.zoom - 1),
                            left: Math.max(0, (jQuery(ui.helper).offset().left - jQuery(this).offset().left) / e2pdf.zoom.zoom - 1),
                            right: Math.min(0, ((parseFloat(jQuery(ui.helper).css('width')) + jQuery(ui.helper).offset().left - 2) - (jQuery(this).offset().left + parseFloat(jQuery(this).css('width')))) / e2pdf.zoom.zoom)
                        };
                        if (pos.left < 0 || pos.right > 0 || pos.top < 0) {
                            return false;
                        }

                        var properties = {};
                        properties['width'] = jQuery(ui.helper).css('width');
                        properties['height'] = jQuery(ui.helper).css('height');
                        properties['top'] = pos.top;
                        properties['left'] = pos.left;
                        properties['value'] = jQuery(ui.draggable).attr('data-value');
                        var el = e2pdf.element.create(type, page, properties, false, true);
                        jQuery(this).append(el);
                        e2pdf.properties.render(el);
                    }
                    e2pdf.static.drag.page = null;
                }
            });
            page.contextmenu(function (e) {
                if (jQuery(e.target).hasClass('e2pdf-page')) {
                    e2pdf.contextMenu(e, page);
                    e.preventDefault();
                }
            });
            page.selectable(
                    {
                        filter: '.e2pdf-element',
                        cancel: 'a,.e2pdf-element',
                        distance: 10,
                        selecting: function (event, ui) {
                            if (jQuery('html').hasClass('e2pdf-unlock-all-elements') || !jQuery(ui.selecting).hasClass('e2pdf-locked')) {
                                jQuery(ui.selecting).addClass('e2pdf-selected');
                            }
                        },
                        unselecting: function (event, ui) {
                            jQuery(ui.unselecting).removeClass('e2pdf-selected');
                        },
                        selected: function (event, ui) {
                            if (jQuery('html').hasClass('e2pdf-unlock-all-elements') || !jQuery(ui.selected).hasClass('e2pdf-locked')) {
                                e2pdf.element.select(jQuery(ui.selected));
                            }
                        },
                        unselected: function (event, ui) {
                            e2pdf.element.unselect(jQuery(ui.unselected));
                        }
                    });
            if (newpage) {
                jQuery('.e2pdf-tpl .e2pdf-tpl-inner').append(page);
                e2pdf.pages.rebuildPages();
                e2pdf.event.fire('after.pages.createPage.newpage');
                return true;
            } else {
                return false;
            }
        },
        /*
         * e2pdf.pages.movePage
         */
        movePage: function (el, direction) {

            if (e2pdf.pdf.settings.get('pdf')) {
                return false;
            }
            if (direction === 'up') {
                el.closest('.e2pdf-page').insertBefore(el.closest('.e2pdf-page').prev('.e2pdf-page'));
            } else if (direction === 'down') {
                el.closest('.e2pdf-page').insertAfter(el.closest('.e2pdf-page').next('.e2pdf-page'));
            }
            e2pdf.event.fire('after.pages.movePage');
            e2pdf.pages.rebuildPages();
        },
        /*
         * e2pdf.pages.deletePage
         */
        deletePage: function (el) {
            el.closest('.e2pdf-page').remove();
            e2pdf.event.fire('after.pages.deletePage');
            e2pdf.pages.rebuildPages();
        },
        /*
         * e2pdf.pages.changeTplSize
         */
        changeTplSize: function (width, height) {
            jQuery('.e2pdf-tpl').attr('data-width', width).attr('data-height', height);
        },
        changePageSize: function (el, width, height) {
            var set_width = true;
            var set_height = true;
            var prev_width = parseFloat(el.css('width'));
            var prev_height = parseFloat(el.css('height'));
            var width_diff = width / prev_width;
            var height_diff = height / prev_height;
            el.find(".e2pdf-element").each(function () {
                jQuery(this).css('left', parseFloat(jQuery(this).css('left')) * width_diff);
                jQuery(this).css('top', parseFloat(jQuery(this).css('top')) * height_diff);
                if (jQuery(this).data('data-type') === 'e2pdf-qrcode' || (e2pdf.properties.getValue(jQuery(this), 'dimension') == '1' && (jQuery(this).data('data-type') === 'e2pdf-image' || jQuery(this).data('data-type') === 'e2pdf-barcode' || jQuery(this).data('data-type') === 'e2pdf-signature'))) {
                    jQuery(this).css('width', parseFloat(jQuery(this).css('width')) * width_diff);
                    jQuery(this).css('height', parseFloat(jQuery(this).css('height')) * width_diff);
                } else {
                    jQuery(this).css('width', parseFloat(jQuery(this).css('width')) * width_diff);
                    jQuery(this).css('height', parseFloat(jQuery(this).css('height')) * height_diff);
                }
            });
            el.css('width', width);
            el.css('height', height);
            el.attr('data-width', width);
            el.attr('data-height', height);
        }
    },
    /*
     * e2pdf.contextMenu
     */
    contextMenu: function (e, el) {
        e2pdf.delete('.e2pdf-context');
        jQuery('.e2pdf-page').css('z-index', '');
        var menu = jQuery('<div>', {'class': 'e2pdf-context'});
        var context_menu_width = 120;
        var sub_context_menu_width = 0;
        if (el.hasClass('e2pdf-page')) {
            var parent = el;
            menu.append(jQuery('<ul>', {'class': 'e2pdf-context-menu'}));
            menu.find('ul.e2pdf-context-menu').append(
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-paste e2pdf-link', 'disabled': Object.keys(e2pdf.element.buffered).length > 0 ? false : 'disabled'}).html(e2pdfLang['Paste'])
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-pasteinplace e2pdf-link', 'disabled': Object.keys(e2pdf.element.buffered).length > 0 ? false : 'disabled'}).html(e2pdfLang['Paste in Place'])
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-page-options e2pdf-modal', 'data-modal': 'page-options'}).html(e2pdfLang['Properties'])
                    )
                    );
        } else {
            if (!el.hasClass('e2pdf-selected')) {
                e2pdf.element.unselect();
                e2pdf.element.select(el);
            }

            var parent = el.closest('.e2pdf-page');
            sub_context_menu_width = 120;
            menu.append(jQuery('<ul>', {'class': 'e2pdf-context-menu'}));
            if (Object.keys(e2pdf.element.selected).length == 1 && el.data('data-type') !== 'e2pdf-rectangle' && el.data('data-type') !== 'e2pdf-page-number') {
                menu.find('ul.e2pdf-context-menu').append(
                        jQuery('<li>').append(
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-visual'}).html(e2pdfLang['Map Field'])
                        ));
            }

            if (Object.keys(e2pdf.element.selected).length == 1 && (el.data('data-type') === 'e2pdf-image' || (el.data('data-type') === 'e2pdf-signature' && !e2pdf.properties.getValue(el, 'esig')))) {
                menu.find('ul.e2pdf-context-menu').append(
                        jQuery('<li>').append(
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-upload'}).html(e2pdfLang['Choose Image'])
                        ));
            }

            menu.find('ul.e2pdf-context-menu').append(
                    jQuery('<li>', {'class': 'e2pdf-inner-context-menu'}).append(
                    jQuery('<a>', {'href': 'javascript:void(0);'}).append(jQuery('<span>').html(e2pdfLang['Lock & Hide']), jQuery('<span>', {'class': 'e2pdf-inner-context-arrow'}))
                    ,
                    jQuery('<ul>', {'class': 'e2pdf-sub-context-menu'}).append(
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': el.hasClass('e2pdf-locked') ? 'e2pdf-unlock' : 'e2pdf-lock'}).html(el.hasClass('e2pdf-locked') ? e2pdfLang['Unlock'] : e2pdfLang['Lock'])
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': el.hasClass('e2pdf-hide') ? 'e2pdf-unhidden' : 'e2pdf-hidden'}).html(el.hasClass('e2pdf-hide') ? e2pdfLang['Unhide'] : e2pdfLang['Hide'])
                    ))
                    ));
            menu.find('ul.e2pdf-context-menu').append(
                    jQuery('<li>', {'class': 'e2pdf-inner-context-menu'}).append(
                    jQuery('<a>', {'href': 'javascript:void(0);'}).append(jQuery('<span>').html(e2pdfLang['Copy']), jQuery('<span>', {'class': 'e2pdf-inner-context-arrow'}))
                    ,
                    jQuery('<ul>', {'class': 'e2pdf-sub-context-menu e2pdf-copy-menu'}).append(
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-copy'}).html(Object.keys(e2pdf.element.selected).length > 1 ? e2pdfLang['Elements'] : e2pdfLang['Element'])
                    ))
                    ),
                    jQuery('<li>', {'class': 'e2pdf-inner-context-menu e2pdf-paste-menu e2pdf-hide'}).append(
                    jQuery('<a>', {'href': 'javascript:void(0);'}).append(jQuery('<span>').html(e2pdfLang['Paste']), jQuery('<span>', {'class': 'e2pdf-inner-context-arrow'}))
                    ,
                    jQuery('<ul>', {'class': 'e2pdf-sub-context-menu e2pdf-paste-menu'})
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-resize'}).html(e2pdfLang['Resize'])
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-cut'}).html(e2pdfLang['Cut'])
                    ),
                    jQuery('<li>').append(
                    jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-delete'}).html(e2pdfLang['Delete'])
                    ));
            if (Object.keys(e2pdf.element.selected).length == 1 || e2pdf.element.bufferedStyle != null) {

                if (Object.keys(e2pdf.element.selected).length == 1) {
                    menu.find('ul.e2pdf-copy-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-copy-style'}).html(e2pdfLang['Style'])
                            ));
                }

                if (e2pdf.element.bufferedStyle != null) {
                    menu.find('li.e2pdf-paste-menu').removeClass('e2pdf-hide');
                    menu.find('ul.e2pdf-paste-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-paste-style'}).html(e2pdfLang['Style'])
                            ));
                }
            }

            if (Object.keys(e2pdf.element.selected).length == 1 || e2pdf.element.bufferedWidth != null) {

                if (Object.keys(e2pdf.element.selected).length == 1) {
                    menu.find('ul.e2pdf-copy-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-copy-width'}).html(e2pdfLang['Width'])
                            ));
                }

                if (e2pdf.element.bufferedWidth != null) {
                    menu.find('li.e2pdf-paste-menu').removeClass('e2pdf-hide');
                    menu.find('ul.e2pdf-paste-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-paste-width'}).html(e2pdfLang['Width'])
                            ));
                }
            }


            if (Object.keys(e2pdf.element.selected).length == 1 || e2pdf.element.bufferedHeight != null) {

                if (Object.keys(e2pdf.element.selected).length == 1) {
                    menu.find('ul.e2pdf-copy-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-copy-height'}).html(e2pdfLang['Height'])
                            ));
                }

                if (e2pdf.element.bufferedHeight != null) {
                    menu.find('li.e2pdf-paste-menu').removeClass('e2pdf-hide');
                    menu.find('ul.e2pdf-paste-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-paste-height'}).html(e2pdfLang['Height'])
                            ));
                }
            }

            if (Object.keys(e2pdf.element.selected).length == 1 || e2pdf.element.bufferedActions != null) {

                if (Object.keys(e2pdf.element.selected).length == 1) {
                    menu.find('ul.e2pdf-copy-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-copy-actions'}).html(e2pdfLang['Actions'])
                            ));
                }

                if (e2pdf.element.bufferedActions != null) {
                    menu.find('li.e2pdf-paste-menu').removeClass('e2pdf-hide');
                    menu.find('ul.e2pdf-paste-menu').append(
                            jQuery('<li>').append(
                            jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-paste-actions'}).html(e2pdfLang['Actions'])
                            ));
                }
            }

            if (Object.keys(e2pdf.element.selected).length == 1) {
                menu.find('ul.e2pdf-context-menu').append(
                        jQuery('<li>').append(
                        jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-properties e2pdf-modal', 'data-modal': 'properties'}).html(e2pdfLang['Properties'])
                        ));
            }
        }

        parent.css('z-index', '1');
        var pos_x = (e.pageX - parent.offset().left) / e2pdf.zoom.zoom;
        if ((parent.closest('.e2pdf-tpl').width() - 20 < e.pageX - parent.closest('.e2pdf-tpl').offset().left + (context_menu_width * e2pdf.zoom.zoom) + (sub_context_menu_width * e2pdf.zoom.zoom)) && (e.pageX - parent.closest('.e2pdf-tpl').offset().left > (context_menu_width * e2pdf.zoom.zoom) + (sub_context_menu_width * e2pdf.zoom.zoom))) {
            pos_x = pos_x - context_menu_width;
            menu.find('ul.e2pdf-context-menu').addClass('e2pdf-contenxt-menu-right');
        }
        var pos_y = (e.pageY - parent.offset().top) / e2pdf.zoom.zoom;
        menu.css({top: pos_y + "px", left: pos_x + "px"});
        menu.appendTo(parent);
    },
    /*
     * e2pdf.delete
     */
    delete: function (el) {
        jQuery(el).remove();
    },
    /*
     * e2pdf.element
     */
    element: {
        /*
         * e2pdf.element.buffered
         */
        buffered: [],
        /*
         * e2pdf.element.bufferedStyle
         */
        bufferedStyle: null,
        /*
         * e2pdf.element.bufferedActions
         */
        bufferedActions: null,
        /*
         * e2pdf.element.bufferedWidth
         */
        bufferedWidth: null,
        /*
         * e2pdf.element.bufferedHeight
         */
        bufferedHeight: null,
        /*
         * e2pdf.element.selected
         */
        selected: [],
        /*
         * e2pdf.element.init
         */
        init: function (el) {
            if (el.data('data-type') === 'e2pdf-html') {
                if (e2pdf.properties.getValue(el, 'wysiwyg_disable') == '1') {
                    e2pdf.properties.set(el, 'value', el.find('.e2pdf-html').val());
                } else {
                    e2pdf.properties.set(el, 'value', el.find('.e2pdf-html').html());
                }
            } else if (el.data('data-type') === 'e2pdf-input') {
                e2pdf.properties.set(el, 'value', el.find('.e2pdf-input').val());
            } else if (el.data('data-type') === 'e2pdf-textarea') {
                e2pdf.properties.set(el, 'value', el.find('.e2pdf-textarea').val());
            }
        },
        /*
         * e2pdf.element.create
         */
        create: function (type, page, properties, actions, default_properties, onload, element_id) {
            var size = parseFloat(jQuery('#e2pdf-line-height').val()) + 4;
            var aspect = false;
            var min_height = 2;
            var min_width = 2;
            if (!properties) {
                properties = {};
            }

            if (!actions) {
                actions = {};
            }

            if (type === 'e2pdf-input') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = size;
                }

                if (!properties['name']) {
                    properties['name'] = '';
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }

                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['text_letter_spacing']) {
                    properties['text_letter_spacing'] = '0';
                }

                if (!properties['text_auto_font_size']) {
                    properties['text_auto_font_size'] = '0';
                }

                if (!properties['text_align']) {
                    properties['text_align'] = '';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['length']) {
                    properties['length'] = '0';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['comb']) {
                    properties['comb'] = '';
                }

                if (!properties['required']) {
                    properties['required'] = '';
                }

                if (!properties['readonly']) {
                    properties['readonly'] = '';
                }

                if (!properties['pass']) {
                    properties['pass'] = '';
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border']) {
                    if (default_properties) {
                        properties['border'] = '1';
                    } else {
                        properties['border'] = '0';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element =
                        jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<input>', {'type': 'text', 'class': 'e2pdf-input e2pdf-inner-element'}).val(properties['value']),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-textarea') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = '100';
                }

                if (!properties['name']) {
                    properties['name'] = '';
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }

                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['text_letter_spacing']) {
                    properties['text_letter_spacing'] = '0';
                }

                if (!properties['text_auto_font_size']) {
                    properties['text_auto_font_size'] = '0';
                }

                if (!properties['text_line_height']) {
                    properties['text_line_height'] = '';
                }

                if (!properties['text_align']) {
                    properties['text_align'] = '';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['length']) {
                    properties['length'] = '0';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['comb']) {
                    properties['comb'] = '';
                }

                if (!properties['required']) {
                    properties['required'] = '';
                }

                if (!properties['readonly']) {
                    properties['readonly'] = '';
                }

                if (!properties['pass']) {
                    properties['pass'] = '';
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border']) {
                    if (default_properties) {
                        properties['border'] = '1';
                    } else {
                        properties['border'] = '0';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<textarea>', {'type': 'text', 'class': 'e2pdf-textarea e2pdf-inner-element'}).val(properties['value']),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-checkbox') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = size;
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = size;
                }

                if (!properties['name']) {
                    properties['name'] = '';
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_type']) {
                    properties['text_type'] = 'check';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['required']) {
                    properties['required'] = '';
                }

                if (!properties['readonly']) {
                    properties['readonly'] = '';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border']) {
                    if (default_properties) {
                        properties['border'] = '1';
                    } else {
                        properties['border'] = '0';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['option']) {
                    if (default_properties) {
                        properties['option'] = "option";
                    } else {
                        properties['option'] = "";
                    }
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<input>', {'type': 'checkbox', 'class': 'e2pdf-checkbox e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-radio') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = size;
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = size;
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_type']) {
                    properties['text_type'] = 'circle';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['required']) {
                    properties['required'] = '';
                }

                if (!properties['readonly']) {
                    properties['readonly'] = '';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border']) {
                    if (default_properties) {
                        properties['border'] = '1';
                    } else {
                        properties['border'] = '0';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['group']) {
                    if (default_properties) {
                        properties['group'] = 'group';
                    } else {
                        properties['group'] = '';
                    }
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['option']) {
                    if (default_properties) {
                        properties['option'] = 'option';
                    } else {
                        properties['option'] = '';
                    }
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<input>', {'type': 'radio', 'class': 'e2pdf-radio e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
                var aspect = false;
            } else if (type === 'e2pdf-select') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = size;
                }

                if (!properties['name']) {
                    properties['name'] = '';
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }
                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }
                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['text_letter_spacing']) {
                    properties['text_letter_spacing'] = '0';
                }

                if (!properties['text_auto_font_size']) {
                    properties['text_auto_font_size'] = '0';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['multiline']) {
                    properties['multiline'] = '';
                }

                if (!properties['required']) {
                    properties['required'] = '';
                }

                if (!properties['readonly']) {
                    properties['readonly'] = '';
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border']) {
                    if (default_properties) {
                        properties['border'] = '1';
                    } else {
                        properties['border'] = '0';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['options']) {
                    if (default_properties) {
                        properties['options'] = '';
                    } else {
                        properties['options'] = '';
                    }
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<select>', {'class': 'e2pdf-select e2pdf-inner-element'}).append(
                        ),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-signature') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = '75';
                }

                if (!properties['name']) {
                    properties['name'] = '';
                }

                if (!properties['field_name']) {
                    properties['field_name'] = '';
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }

                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['placeholder']) {
                    properties['placeholder'] = '';
                }

                if (!properties['esig']) {
                    properties['esig'] = '';
                }

                if (!properties['horizontal']) {
                    properties['horizontal'] = 'left';
                }

                if (!properties['vertical']) {
                    properties['vertical'] = 'bottom';
                }

                if (!properties['dimension']) {
                    if (default_properties) {
                        properties['dimension'] = '1';
                    } else {
                        properties['dimension'] = '';
                    }
                }

                if (!properties['block_dimension']) {
                    if (default_properties) {
                        properties['block_dimension'] = '1';
                    } else {
                        properties['block_dimension'] = '';
                    }
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }

                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }

                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }

                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }
                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }
                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }
                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                if (!properties['only_image']) {
                    properties['only_image'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-loader e2pdf-resizable'}).append(
                        jQuery('<img>', {'class': 'e2pdf-signature e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-html') {

                if (!properties['width']) {
                    properties['width'] = '200';
                } else if (properties['width'] === 'auto') {
                    properties['width'] = size;
                }

                if (!properties['height']) {
                    properties['height'] = size;
                } else if (properties['height'] === 'auto') {
                    delete properties['height'];
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }

                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }

                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['text_letter_spacing']) {
                    properties['text_letter_spacing'] = '0';
                }

                if (!properties['text_line_height']) {
                    properties['text_line_height'] = '';
                }

                if (!properties['text_align']) {
                    properties['text_align'] = '';
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['vertical']) {
                    properties['vertical'] = 'top';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['multipage']) {
                    properties['multipage'] = '';
                }

                if (!properties['dynamic_height']) {
                    properties['dynamic_height'] = '';
                }

                if (!properties['nl2br']) {
                    properties['nl2br'] = '';
                }

                if (!properties['hide_if_empty']) {
                    properties['hide_if_empty'] = '';
                }

                if (!properties['hide_page_if_empty']) {
                    properties['hide_page_if_empty'] = '';
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }

                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }

                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }

                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }

                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }

                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }

                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['parent']) {
                    properties['parent'] = '';
                }

                if (!properties['css']) {
                    properties['css'] = '';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                if (!properties['wysiwyg_disable']) {
                    properties['wysiwyg_disable'] = '';
                }

                if (!properties['css_priority']) {
                    if (default_properties) {
                        properties['css_priority'] = '1';
                    } else {
                        properties['css_priority'] = '';
                    }
                }

                if (properties['wysiwyg_disable'] == '1') {
                    var element =
                            jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                            jQuery('<textarea>', {'class': 'content e2pdf-html e2pdf-inner-element'}).html(properties['value']),
                            jQuery('<i>', {'class': 'e2pdf-drag'})
                            );
                } else {
                    var element =
                            jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                            jQuery('<div>', {'contenteditable': true, 'class': 'content e2pdf-html e2pdf-inner-element'}).html(properties['value']),
                            jQuery('<i>', {'class': 'e2pdf-drag'})
                            );
                }

            } else if (type === 'e2pdf-image') {
                if (!properties['horizontal']) {
                    properties['horizontal'] = 'left';
                }
                if (!properties['vertical']) {
                    properties['vertical'] = 'bottom';
                }
                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }
                if (!properties['opacity']) {
                    properties['opacity'] = '1';
                }
                if (!properties['dimension']) {
                    if (default_properties) {
                        properties['dimension'] = '1';
                    } else {
                        properties['dimension'] = '';
                    }
                }
                if (!properties['block_dimension']) {
                    if (default_properties) {
                        properties['block_dimension'] = '1';
                    } else {
                        if (properties['scale'] && (properties['scale'] == '1' || properties['scale'] == '2')) {
                            properties['block_dimension'] = '1';
                        } else {
                            properties['block_dimension'] = '';
                        }
                    }
                }
                if (!properties['background']) {
                    properties['background'] = '';
                }
                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }
                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }
                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }
                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }
                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }
                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }
                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }
                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }
                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }
                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }
                if (!properties['value']) {
                    properties['value'] = '';
                }
                if (!properties['only_image']) {
                    properties['only_image'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-loader e2pdf-resizable', 'width': '100px', height: '100px'}).append(
                        jQuery('<img>', {'class': 'e2pdf-image e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-rectangle') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = '5';
                }

                if (!properties['background']) {
                    if (default_properties) {
                        properties['background'] = '#000000';
                    } else {
                        properties['background'] = '';
                    }
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                var min_height = 1;
                var min_width = 1;
                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<div>', {'class': 'content e2pdf-rectangle e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-link') {

                if (!properties['width'] || properties['width'] === 'auto') {
                    properties['width'] = '200';
                }

                if (!properties['height'] || properties['height'] === 'auto') {
                    properties['height'] = size;
                }

                if (!properties['highlight']) {
                    properties['highlight'] = 'none';
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element =
                        jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<div>', {'class': 'content e2pdf-link e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-qrcode') {

                if (!properties['color']) {
                    properties['color'] = '#000000';
                }

                if (!properties['precision']) {
                    properties['precision'] = 'qrl';
                }

                if (!properties['wq']) {
                    if (default_properties) {
                        properties['wq'] = '1';
                    } else {
                        properties['wq'] = '0';
                    }
                }

                if (!properties['background']) {
                    if (default_properties) {
                        properties['background'] = '#ffffff';
                    } else {
                        properties['background'] = '';
                    }
                }

                if (!properties['margin_top']) {
                    properties['margin_top'] = '0';
                }
                if (!properties['margin_left']) {
                    properties['margin_left'] = '0';
                }
                if (!properties['margin_right']) {
                    properties['margin_right'] = '0';
                }
                if (!properties['margin_bottom']) {
                    properties['margin_bottom'] = '0';
                }

                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }
                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }
                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }
                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }
                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }
                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }
                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-loader e2pdf-resizable', 'width': '100px', height: '100px'}).append(
                        jQuery('<img>', {'class': 'e2pdf-qrcode e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-barcode') {

                if (!properties['text_color']) {
                    properties['text_color'] = '#000000';
                }

                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }
                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }
                if (!properties['text_line_height']) {
                    properties['text_line_height'] = '';
                }

                if (!properties['color']) {
                    properties['color'] = '#000000';
                }

                if (!properties['format']) {
                    properties['format'] = 'upc-a';
                }

                if (!properties['wq']) {
                    if (default_properties) {
                        properties['wq'] = '1';
                    } else {
                        properties['wq'] = '0';
                    }
                }

                if (!properties['horizontal']) {
                    properties['horizontal'] = 'center';
                }
                if (!properties['vertical']) {
                    properties['vertical'] = 'middle';
                }

                if (!properties['scale']) {
                    if (default_properties) {
                        properties['scale'] = '0';
                    } else {
                        properties['scale'] = '1';
                    }
                }

                if (!properties['dimension']) {
                    if (default_properties) {
                        properties['dimension'] = '1';
                    } else {
                        properties['dimension'] = '';
                    }
                }

                if (!properties['hl']) {
                    properties['hl'] = '';
                }

                if (!properties['background']) {
                    if (default_properties) {
                        properties['background'] = '#ffffff';
                    } else {
                        properties['background'] = '';
                    }
                }

                if (!properties['margin_top']) {
                    if (default_properties) {
                        properties['margin_top'] = '10';
                    } else {
                        if (typeof properties['margin_top'] === 'undefined') {
                            properties['margin_top'] = '10';
                        } else {
                            properties['margin_top'] = '0';
                        }
                    }
                }

                if (!properties['margin_left']) {
                    if (default_properties) {
                        properties['margin_left'] = '10';
                    } else {
                        if (typeof properties['margin_left'] === 'undefined') {
                            properties['margin_left'] = '10';
                        } else {
                            properties['margin_left'] = '0';
                        }

                    }
                }

                if (!properties['margin_right']) {
                    if (default_properties) {
                        properties['margin_right'] = '10';
                    } else {
                        if (typeof properties['margin_right'] === 'undefined') {
                            properties['margin_right'] = '10';
                        } else {
                            properties['margin_right'] = '0';
                        }
                    }
                }

                if (!properties['margin_bottom']) {
                    if (default_properties) {
                        properties['margin_bottom'] = '10';
                    } else {
                        if (typeof properties['margin_bottom'] === 'undefined') {
                            properties['margin_bottom'] = '10';
                        } else {
                            properties['margin_bottom'] = '0';
                        }
                    }
                }

                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }

                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }

                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }

                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }
                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }
                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }
                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }

                if (!properties['z_index']) {
                    properties['z_index'] = '0';
                }

                if (!properties['value']) {
                    properties['value'] = '';
                }

                var element = jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-loader e2pdf-resizable', 'width': '200px', height: '75px'}).append(
                        jQuery('<img>', {'class': 'e2pdf-barcode e2pdf-inner-element'}),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            } else if (type === 'e2pdf-page-number') {

                if (!properties['width']) {
                    properties['width'] = '100';
                } else if (properties['width'] === 'auto') {
                    properties['width'] = size;
                }

                if (!properties['height']) {
                    properties['height'] = size;
                } else if (properties['height'] === 'auto') {
                    delete properties['height'];
                }

                if (!properties['text_color']) {
                    properties['text_color'] = '';
                }
                if (!properties['text_font']) {
                    properties['text_font'] = '';
                }
                if (!properties['text_font_size']) {
                    properties['text_font_size'] = '';
                }

                if (!properties['text_letter_spacing']) {
                    properties['text_letter_spacing'] = '0';
                }

                if (!properties['text_line_height']) {
                    properties['text_line_height'] = '';
                }

                if (!properties['text_align']) {
                    if (default_properties) {
                        properties['text_align'] = 'center';
                    } else {
                        properties['text_align'] = '';
                    }
                }

                if (!properties['rotation']) {
                    properties['rotation'] = '0';
                }

                if (!properties['vertical']) {
                    properties['vertical'] = 'top';
                }

                if (!properties['rtl']) {
                    properties['rtl'] = '';
                }

                if (!properties['background']) {
                    properties['background'] = '';
                }

                if (!properties['padding_top']) {
                    properties['padding_top'] = '0';
                }
                if (!properties['padding_left']) {
                    properties['padding_left'] = '0';
                }
                if (!properties['padding_right']) {
                    properties['padding_right'] = '0';
                }
                if (!properties['padding_bottom']) {
                    properties['padding_bottom'] = '0';
                }

                if (!properties['border_color']) {
                    properties['border_color'] = '#000000';
                }

                if (!properties['border_top']) {
                    properties['border_top'] = '0';
                }

                if (!properties['border_left']) {
                    properties['border_left'] = '0';
                }

                if (!properties['border_right']) {
                    properties['border_right'] = '0';
                }

                if (!properties['border_bottom']) {
                    properties['border_bottom'] = '0';
                }

                if (!properties['css']) {
                    properties['css'] = '';
                }

                if (!properties['value']) {
                    if (default_properties) {
                        properties['value'] = '[e2pdf-page-number] / [e2pdf-page-total]';
                    } else {
                        properties['value'] = '';
                    }
                }

                var element =
                        jQuery('<div>', {'class': 'e2pdf-el-wrapper e2pdf-resizable'}).append(
                        jQuery('<div>', {'class': 'content e2pdf-page-number e2pdf-inner-element'}).html(properties['value'].replace('[e2pdf-page-number]', '1').replace('[e2pdf-page-total]', '2')),
                        jQuery('<i>', {'class': 'e2pdf-drag'})
                        );
            }

            if (typeof element !== "undefined") {
                element.contextmenu(function (e) {
                    e2pdf.contextMenu(e, element);
                    e.preventDefault();
                });
                if (!element_id) {
                    var last_id = 0;
                    jQuery('#e2pdf-tpl .e2pdf-element').each(function () {
                        var num_id = parseInt(jQuery(this).attr("data-element_id"));
                        if (num_id > last_id) {
                            last_id = num_id;
                        }
                    });
                    element_id = parseInt(last_id + 1);
                }

                element.addClass('e2pdf-element');
                element.attr('data-element_id', element_id);
                element.data('data-type', type);
                if (properties['width']) {
                    element.css({"width": properties['width']});
                }
                if (properties['height']) {
                    element.css({"height": properties['height']});
                }

                if (properties['top'] && properties['left']) {
                    element.css({"top": properties['top'], "left": properties['left']});
                }

                element.css({"position": "absolute"});
                e2pdf.properties.apply(element, properties);
                e2pdf.actions.apply(element, actions);
                element.draggable({
                    cancel: '.no-drag',
                    handle: ".e2pdf-drag",
                    containment: jQuery(page),
                    stop: function (ev, ui) {
                        var page = jQuery(this).closest('.e2pdf-page');
                        for (var key in e2pdf.element.selected) {
                            var selected = e2pdf.element.selected[key];
                            if (selected.hasClass('e2pdf-width-auto')) {
                                selected.css({'width': 'auto'});
                            }
                            if (selected.hasClass('e2pdf-height-auto')) {
                                selected.css({'height': 'auto'});
                            }

                            e2pdf.properties.set(selected, 'top', Math.max(0, e2pdf.helper.pxToFloat(selected.css('top'))));
                            e2pdf.properties.set(selected, 'left', Math.max(0, e2pdf.helper.pxToFloat(selected.css('left'))));
                        }

                        jQuery('.page-options-icons').css('z-index', '');
                        e2pdf.event.fire('after.element.moved');
                        e2pdf.element.unselect();
                        jQuery(".e2pdf-guide-v, .e2pdf-guide-h").hide();
                    },
                    drag: function (ev, ui) {
                        var left = (ev.clientX - e2pdf.zoom.click.x + ui.originalPosition.left) / e2pdf.zoom.zoom;
                        var top = (ev.clientY - e2pdf.zoom.click.y + ui.originalPosition.top) / e2pdf.zoom.zoom;
                        left = Math.min(left, e2pdf.static.drag.max_left);
                        top = Math.min(top, e2pdf.static.drag.max_top);
                        ui.position = {
                            left: Math.max(e2pdf.static.drag.min_left, left),
                            top: Math.max(e2pdf.static.drag.min_top, top)
                        };
                        var diff_top = ui.position.top - parseFloat(e2pdf.properties.getValue(jQuery(this), 'top'));
                        var diff_left = ui.position.left - parseFloat(e2pdf.properties.getValue(jQuery(this), 'left'));
                        for (var key in e2pdf.element.selected) {
                            var selected = e2pdf.element.selected[key];
                            if (!selected.is(jQuery(this))) {
                                selected.finish().animate({
                                    left: parseFloat(e2pdf.properties.getValue(selected, 'left')) + diff_left,
                                    top: parseFloat(e2pdf.properties.getValue(selected, 'top')) + diff_top
                                }, 0);
                            }
                        }

                        var guides = {top: {dist: e2pdf.static.guide.distance + 1}, left: {dist: e2pdf.static.guide.distance + 1}};
                        var w = parseFloat(jQuery(this).css('width'));
                        var h = parseFloat(jQuery(this).css('height'));
                        var el_guides = e2pdf.guide.calc(null, ui.position, w, h);
                        jQuery.each(e2pdf.static.guide.guides, function (i, guide) {
                            jQuery.each(el_guides, function (i, elemGuide) {
                                if (guide.type == elemGuide.type) {
                                    var prop = guide.type == "h" ? "top" : "left";
                                    var d = Math.abs(elemGuide[prop] - guide[prop]);
                                    if (d < guides[prop].dist) {
                                        guides[prop].dist = d;
                                        guides[prop].offset = elemGuide[prop] - ui.position[prop];
                                        guides[prop].guide = guide;
                                    }
                                }
                            });
                        });
                        if (guides.top.dist <= e2pdf.static.guide.distance) {
                            jQuery(this).closest('.e2pdf-page').find(".e2pdf-guide-h").css("top", guides.top.guide.top).show();
                            var snap_top = guides.top.guide.top - guides.top.offset;
                            if (e2pdf.static.drag.max_top >= snap_top && snap_top >= e2pdf.static.drag.min_top) {
                                ui.position.top = snap_top;
                                var guide_diff_top = ui.position.top - parseFloat(e2pdf.properties.getValue(jQuery(this), 'top'));
                                for (var key in e2pdf.element.selected) {
                                    var selected = e2pdf.element.selected[key];
                                    if (!selected.is(jQuery(this))) {
                                        selected.finish().animate({
                                            top: parseFloat(e2pdf.properties.getValue(selected, 'top')) + guide_diff_top
                                        }, 0);
                                    }
                                }
                            }
                        } else {
                            jQuery(".e2pdf-guide-h").hide();
                        }

                        if (guides.left.dist <= e2pdf.static.guide.distance) {
                            jQuery(this).closest('.e2pdf-page').find(".e2pdf-guide-v").css("left", guides.left.guide.left).show();
                            var snap_left = guides.left.guide.left - guides.left.offset;
                            if (e2pdf.static.drag.max_left >= snap_left && snap_left >= e2pdf.static.drag.min_left) {
                                ui.position.left = snap_left;
                                var guide_diff_left = ui.position.left - parseFloat(e2pdf.properties.getValue(jQuery(this), 'left'));
                                for (var key in e2pdf.element.selected) {
                                    var selected = e2pdf.element.selected[key];
                                    if (!selected.is(jQuery(this))) {
                                        selected.finish().animate({
                                            left: parseFloat(e2pdf.properties.getValue(selected, 'left')) + guide_diff_left
                                        }, 0);
                                    }
                                }
                            }
                        } else {
                            jQuery(".e2pdf-guide-v").hide();
                        }

                    },
                    start: function (ev, ui) {
                        e2pdf.element.select(jQuery(this));
                        e2pdf.static.drag.min_left = 0;
                        e2pdf.static.drag.max_left = jQuery(this).closest('.e2pdf-page').width();
                        e2pdf.static.drag.min_top = 0;
                        e2pdf.static.drag.max_top = jQuery(this).closest('.e2pdf-page').height();
                        for (var key in e2pdf.element.selected) {
                            var selected = e2pdf.element.selected[key];
                            if (selected.hasClass('e2pdf-width-auto')) {
                                selected.css({"width": "auto"});
                            }

                            if (selected.hasClass('e2pdf-height-auto')) {
                                selected.css({"height": "auto"});
                            }

                            var padding_top = e2pdf.helper.pxToFloat(selected.css('padding-top'));
                            var padding_left = e2pdf.helper.pxToFloat(selected.css('padding-left'));
                            var padding_right = e2pdf.helper.pxToFloat(selected.css('padding-right'));
                            var padding_bottom = e2pdf.helper.pxToFloat(selected.css('padding-bottom'));
                            var border_top = e2pdf.helper.pxToFloat(selected.css('border-top-width'));
                            var border_left = e2pdf.helper.pxToFloat(selected.css('border-left-width'));
                            var border_right = e2pdf.helper.pxToFloat(selected.css('border-right-width'));
                            var border_bottom = e2pdf.helper.pxToFloat(selected.css('border-bottom-width'));
                            e2pdf.static.drag.min_left = Math.max(parseFloat(e2pdf.properties.getValue(jQuery(this), 'left')) - e2pdf.properties.getValue(selected, 'left'), e2pdf.static.drag.min_left);
                            e2pdf.static.drag.min_top = Math.max(parseFloat(e2pdf.properties.getValue(jQuery(this), 'top')) - e2pdf.properties.getValue(selected, 'top'), e2pdf.static.drag.min_top);
                            e2pdf.static.drag.max_left = Math.min(selected.closest('.e2pdf-page').width() - selected.width() - padding_left - padding_right - border_left - border_right + (parseFloat(e2pdf.properties.getValue(jQuery(this), 'left')) - parseFloat(e2pdf.properties.getValue(selected, 'left'))), e2pdf.static.drag.max_left);
                            e2pdf.static.drag.max_top = Math.min(selected.closest('.e2pdf-page').height() - selected.height() - padding_top - padding_bottom - border_top - border_bottom + (parseFloat(e2pdf.properties.getValue(jQuery(this), 'top')) - parseFloat(e2pdf.properties.getValue(selected, 'top'))), e2pdf.static.drag.max_top);
                        }

                        e2pdf.zoom.click.x = ev.clientX;
                        e2pdf.zoom.click.y = ev.clientY;
                        jQuery('.page-options-icons').css('z-index', -1);
                    }
                });
                if (element.hasClass('e2pdf-resizable')) {
                    element.resizable({
                        handles: 'n, e, s, w, ne, se, sw, nw',
                        aspectRatio: aspect,
                        minHeight: min_height,
                        minWidth: min_width,
                        start: function (ev, ui) {


                            var _process = function (el, resize) {

                                var left = parseFloat(el.css('left'));
                                var top = parseFloat(el.css('top'));
                                var page_width = parseFloat(el.closest('.e2pdf-page').css('width'));
                                var page_height = parseFloat(el.closest('.e2pdf-page').css('height'));
                                var padding_top = e2pdf.helper.pxToFloat(el.css('padding-top'));
                                var padding_left = e2pdf.helper.pxToFloat(el.css('padding-left'));
                                var padding_right = e2pdf.helper.pxToFloat(el.css('padding-right'));
                                var padding_bottom = e2pdf.helper.pxToFloat(el.css('padding-bottom'));
                                var border_top = e2pdf.helper.pxToFloat(el.css('border-top-width'));
                                var border_left = e2pdf.helper.pxToFloat(el.css('border-left-width'));
                                var border_right = e2pdf.helper.pxToFloat(el.css('border-right-width'));
                                var border_bottom = e2pdf.helper.pxToFloat(el.css('border-bottom-width'));
                                var width = e2pdf.helper.pxToFloat(el.css('width'));
                                var height = e2pdf.helper.pxToFloat(el.css('height'));
                                el.resizable("option", "maxWidth", page_width - left);
                                el.resizable("option", "maxHeight", page_height - top);
                                if (jQuery(ev.originalEvent.target).hasClass('ui-resizable-w') || jQuery(ev.originalEvent.target).hasClass('ui-resizable-sw')) {
                                    el.resizable("option", "maxWidth", left + width);
                                } else if (jQuery(ev.originalEvent.target).hasClass('ui-resizable-n') || jQuery(ev.originalEvent.target).hasClass('ui-resizable-ne')) {
                                    el.resizable("option", "maxHeight", top + height);
                                } else if (jQuery(ev.originalEvent.target).hasClass('ui-resizable-nw')) {
                                    el.resizable("option", "maxWidth", left + width);
                                    el.resizable("option", "maxHeight", top + height);
                                }

                                if (resize) {
                                    ui.originalSize.width = ui.originalSize.width + padding_left + padding_right + border_left + border_right;
                                    ui.originalSize.height = ui.originalSize.height + padding_top + padding_bottom + border_top + border_bottom;
                                }
                            };
                            _process(jQuery(this), true);
                            e2pdf.zoom.click.x = ev.clientX;
                            e2pdf.zoom.click.y = ev.clientY;
                            jQuery('.e2pdf-selected').not(jQuery(this)).each(function () {
                                var el = jQuery(this);
                                var width = e2pdf.helper.pxToFloat(el.css('width'));
                                var height = e2pdf.helper.pxToFloat(el.css('height'));
                                el.data("ui-resizable-alsoresize", {
                                    width: width,
                                    height: height,
                                    left: parseInt(el.css("left")),
                                    top: parseInt(el.css("top"))
                                });
                                _process(jQuery(this), false);
                            });
                        },
                        resize: function (ev, ui) {
                            if (jQuery(this).data('uiResizable')._aspectRatio && ui.element.data("ui-resizable") && typeof ui.element.data("ui-resizable").axis != "undefined") {
                                var axis = ui.element.data("ui-resizable").axis;
                                if (axis != 'nw' && axis != 'sw') {
                                    ui.size.width += jQuery(ui.element).outerWidth() - jQuery(ui.element).width();
                                    ui.size.height += jQuery(ui.element).outerHeight() - jQuery(ui.element).height();
                                }
                            }

                            var delta = {
                                height: (jQuery(ui.element).outerHeight() - ui.originalSize.height) || 0,
                                width: (jQuery(ui.element).outerWidth() - ui.originalSize.width) || 0,
                                top: (ui.position.top - ui.originalPosition.top) || 0,
                                left: (ui.position.left - ui.originalPosition.left) || 0
                            };
                            jQuery('.e2pdf-selected').not(jQuery(this)).each(function () {
                                var el = jQuery(this), start = jQuery(this).data("ui-resizable-alsoresize");
                                var style = {};
                                var css = ["width", "height", "top", "left"];
                                jQuery.each(css, function (i, prop) {
                                    var sum = (start[prop] || 0) + (delta[prop] || 0);
                                    if (sum) {
                                        if (prop == 'width') {
                                            if (sum >= 0 && sum <= el.resizable("option", "maxWidth")) {
                                                style[prop] = sum;
                                            }
                                        } else if (prop == 'height') {
                                            if (sum >= 0 && sum <= el.resizable("option", "maxHeight")) {
                                                style[prop] = sum;
                                            }
                                        } else if (prop == 'left') {
                                            if (sum >= 0) {
                                                style[prop] = sum;
                                            }
                                        } else if (prop == 'top') {
                                            if (sum >= 0) {
                                                style[prop] = sum;
                                            }
                                        }
                                    }
                                });
                                el.css(style);
                            });
                        },
                        stop: function (event, ui) {

                            var _process = function (el, width, height) {

                                if (el.data('data-type') === 'e2pdf-signature' || el.data('data-type') === 'e2pdf-image' || el.data('data-type') === 'e2pdf-qrcode') {
                                    width += el.outerWidth() - el.width();
                                    height += el.outerWidth() - el.width();
                                }

                                e2pdf.properties.set(el, 'width', width);
                                e2pdf.properties.set(el, 'height', height);
                                e2pdf.properties.set(el, 'top', Math.max(0, e2pdf.helper.pxToFloat(el.css('top'))));
                                e2pdf.properties.set(el, 'left', Math.max(0, e2pdf.helper.pxToFloat(el.css('left'))));
                                if (el.data('data-type') === 'e2pdf-signature' || el.data('data-type') === 'e2pdf-image' || el.data('data-type') === 'e2pdf-qrcode') {
                                    e2pdf.properties.render(el);
                                }
                            };
                            _process(jQuery(this), jQuery(this).width(), jQuery(this).height());
                            jQuery('.e2pdf-selected').not(jQuery(this)).each(function () {
                                _process(jQuery(this), jQuery(this).width(), jQuery(this).height());
                                jQuery(this).removeData("resizable-alsoresize");
                            });
                        }
                    });
                }
                if (!onload) {
                    e2pdf.event.fire('after.element.create');
                }
                return element;
            } else {
                return false;
            }
        },
        /*
         * e2pdf.element.children
         */
        children: function (el) {
            var children = false;
            if (el.data('data-type') === 'e2pdf-html') {
                children = el.find('.e2pdf-html');
            } else if (el.data('data-type') === 'e2pdf-page-number') {
                children = el.find('.e2pdf-page-number');
            } else if (el.data('data-type') === 'e2pdf-input') {
                children = el.find('.e2pdf-input');
            } else if (el.data('data-type') === 'e2pdf-textarea') {
                children = el.find('.e2pdf-textarea');
            } else if (el.data('data-type') === 'e2pdf-select') {
                children = el.find('.e2pdf-select');
            } else if (el.data('data-type') === 'e2pdf-radio') {
                children = el.find('.e2pdf-radio');
            } else if (el.data('data-type') === 'e2pdf-checkbox') {
                children = el.find('.e2pdf-checkbox');
            } else if (el.data('data-type') === 'e2pdf-image') {
                children = el.find('.e2pdf-image');
            } else if (el.data('data-type') === 'e2pdf-qrcode') {
                children = el.find('.e2pdf-qrcode');
            } else if (el.data('data-type') === 'e2pdf-barcode') {
                children = el.find('.e2pdf-barcode');
            } else if (el.data('data-type') === 'e2pdf-signature') {
                children = el.find('.e2pdf-signature');
            }
            return children;
        },
        /*
         * e2pdf.element.copy
         */
        copy: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.buffer(el.clone(true));
        },
        /*
         * e2pdf.element.paste
         */
        paste: function (keep_position) {
            e2pdf.element.unselect();
            var min_top = 99999999;
            var min_left = 99999999;
            var left_correction = 0;
            var top_correction = 0;
            if (!keep_position) {
                for (var key in e2pdf.element.buffered) {
                    var buffered = e2pdf.element.buffered[key];
                    min_top = Math.min(e2pdf.properties.getValue(buffered, 'top'), min_top);
                    min_left = Math.min(e2pdf.properties.getValue(buffered, 'left'), min_left);
                }

                for (var key in e2pdf.element.buffered) {
                    var buffered = e2pdf.element.buffered[key];
                    var context = jQuery('.e2pdf-context');
                    var properties = e2pdf.properties.get(buffered);
                    var width = parseFloat(properties['width']);
                    var height = parseFloat(properties['height']);
                    var page = context.closest('.e2pdf-page');
                    var top = parseFloat(e2pdf.helper.pxToFloat(context.css('top')) + (parseFloat(properties['top'] - min_top)));
                    var left = parseFloat(e2pdf.helper.pxToFloat(context.css('left')) + (parseFloat(properties['left']) - min_left));
                    if ((left + width) > parseFloat(page.css('width'))) {
                        var correction = left - (parseFloat(page.css('width')) - width);
                        left_correction = Math.max(correction, left_correction);
                    }

                    if ((top + height) > parseFloat(page.css('height'))) {
                        var correction = top - (parseFloat(page.css('height')) - height);
                        top_correction = Math.max(correction, top_correction);
                    }
                }
            }

            for (var key in e2pdf.element.buffered) {

                var buffered = e2pdf.element.buffered[key];
                var context = jQuery('.e2pdf-context');
                var properties = e2pdf.properties.get(buffered);
                var actions = e2pdf.actions.get(buffered);
                var width = parseFloat(properties['width']);
                var height = parseFloat(properties['height']);
                var page = context.closest('.e2pdf-page');
                var type = buffered.data('data-type');
                if (!keep_position) {
                    var top = parseFloat(e2pdf.helper.pxToFloat(context.css('top')) + (parseFloat(properties['top'] - min_top)) - top_correction);
                    var left = parseFloat(e2pdf.helper.pxToFloat(context.css('left')) + (parseFloat(properties['left']) - min_left) - left_correction);
                    properties['top'] = top;
                    properties['left'] = left;
                }
                var el = e2pdf.element.create(type, page, properties, actions);
                page.append(el);
                e2pdf.properties.render(el);
                e2pdf.element.select(el);
            }

            e2pdf.event.fire('after.element.paste');
        },
        /*
         * e2pdf.element.copyStyle
         */
        copyStyle: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.bufferedStyle = el.clone(true);
        },
        /*
         * e2pdf.element.pasteStyle
         */
        pasteStyle: function (el) {
            if (e2pdf.element.bufferedStyle != null && e2pdf.element.bufferedStyle.data('data-type') == el.data('data-type')) {
                e2pdf.element.init(el);
                var properties = e2pdf.properties.get(e2pdf.element.bufferedStyle);
                for (var key in properties) {
                    if (jQuery.inArray(key, [
                        'width',
                        'height',
                        'top',
                        'left',
                        'name',
                        'field_name',
                        'z_index',
                        'group',
                        'option',
                        'options',
                        'css',
                        'parent',
                        'value',
                        'preg_pattern',
                        'preg_replacement',
                        'preg_match_all_pattern',
                        'preg_match_all_output',
                        'wysiwyg_disable',
                        'multipage',
                        'dynamic_height',
                        'nl2br',
                        'hide_if_empty',
                        'hide_page_if_empty',
                        'css_priority',
                        'esig',
                        'dimension',
                        'block_dimension',
                        'keep_lower_size',
                        'only_image',
                        'hl'
                    ]) === -1) {
                        e2pdf.properties.set(el, key, e2pdf.properties.getValue(e2pdf.element.bufferedStyle, key));
                    }

                    if (el.data('data-type') == 'e2pdf-textarea' || el.data('data-type') == 'e2pdf-input') {
                        e2pdf.properties.set(el, 'text_auto_font_size', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'text_auto_font_size'));
                        e2pdf.properties.set(el, 'comb', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'comb'));
                        e2pdf.properties.set(el, 'required', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'required'));
                        e2pdf.properties.set(el, 'readonly', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'readonly'));
                        e2pdf.properties.set(el, 'pass', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'pass'));
                    }

                    if (el.data('data-type') == 'e2pdf-checkbox' || el.data('data-type') == 'e2pdf-radio') {
                        e2pdf.properties.set(el, 'required', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'required'));
                        e2pdf.properties.set(el, 'readonly', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'readonly'));
                    }

                    if (el.data('data-type') == 'e2pdf-select') {
                        e2pdf.properties.set(el, 'text_auto_font_size', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'text_auto_font_size'));
                        e2pdf.properties.set(el, 'multiline', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'multiline'));
                        e2pdf.properties.set(el, 'required', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'required'));
                        e2pdf.properties.set(el, 'readonly', e2pdf.properties.getValue(e2pdf.element.bufferedStyle, 'readonly'));
                    }
                }

                e2pdf.properties.render(el);
            }
        },
        /*
         * e2pdf.element.copyActions
         */
        copyActions: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.bufferedActions = el.clone(true);
        },
        /*
         * e2pdf.element.pasteActions
         */
        pasteActions: function (el) {
            if (e2pdf.element.bufferedActions != null) {
                e2pdf.element.init(el);
                e2pdf.actions.apply(el, e2pdf.actions.get(e2pdf.element.bufferedActions));
            }
        },
        /*
         * e2pdf.element.copyWidth
         */
        copyWidth: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.bufferedWidth = el.clone(true);
        },
        /*
         * e2pdf.element.pasteWidth
         */
        pasteWidth: function (el) {
            if (e2pdf.element.bufferedWidth != null) {
                e2pdf.element.init(el);
                e2pdf.properties.set(el, 'width', e2pdf.properties.getValue(e2pdf.element.bufferedWidth, 'width'));
                e2pdf.properties.render(el);
            }
        },
        /*
         * e2pdf.element.copyHeight
         */
        copyHeight: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.bufferedHeight = el.clone(true);
        },
        /*
         * e2pdf.element.pasteHeight
         */
        pasteHeight: function (el) {
            if (e2pdf.element.bufferedHeight != null) {
                e2pdf.element.init(el);
                e2pdf.properties.set(el, 'height', e2pdf.properties.getValue(e2pdf.element.bufferedHeight, 'height'));
                e2pdf.properties.render(el);
            }
        },
        /*
         * e2pdf.element.cut
         */
        cut: function (el) {
            e2pdf.element.init(el);
            e2pdf.element.buffer(el.clone(true));
            e2pdf.element.delete(el);
        },
        /*
         * e2pdf.element.select
         */
        select: function (el) {
            var selected = false;
            for (var key in e2pdf.element.selected) {
                if (e2pdf.element.selected[key].is(el)) {
                    selected = true;
                }
            }
            if (!selected) {
                el.addClass('e2pdf-selected');
                e2pdf.element.selected.push(el);
            }
        },
        /*
         * e2pdf.element.unselect
         */
        unselect: function (el) {
            if (!el) {
                jQuery('.e2pdf-selected').removeClass('e2pdf-selected');
                e2pdf.element.selected = [];
            } else {
                for (var key in e2pdf.element.selected) {
                    if (e2pdf.element.selected[key].is(el)) {
                        el.removeClass('e2pdf-selected');
                        delete e2pdf.element.selected[key];
                    }
                }
            }
        },
        /*
         * e2pdf.element.unfocus
         */
        unfocus: function (el) {
            e2pdf.wysiwyg.helper.dropSelection();
            if (!el) {
                jQuery('.e2pdf-focused').removeClass('e2pdf-focused');
                jQuery('.e2pdf-el-wrapper').find('.e2pdf-inner-element:focus').each(function () {
                    jQuery(this).blur();
                });
            } else {
                el.find('.e2pdf-inner-element').blur();
                el.removeClass('e2pdf-focused');
            }
        },
        /*
         * e2pdf.element.focus
         */
        focus: function (el) {
            var el_inner = el.find('.e2pdf-inner-element');
            el_inner.focus();
            el.addClass('e2pdf-focused');
        },
        /*
         * e2pdf.element.buffer
         */
        buffer: function (el) {
            var buffered = false;
            for (var key in e2pdf.element.buffered) {
                if (e2pdf.element.buffered[key].is(el)) {
                    buffered = true;
                }
            }
            if (!buffered) {
                e2pdf.element.buffered.push(el);
            }
        },
        /*
         * e2pdf.element.unbuffer
         */
        unbuffer: function (el) {
            if (!el) {
                e2pdf.element.buffered = [];
            } else {
                for (var key in e2pdf.element.buffered) {
                    if (e2pdf.element.buffered[key].is(el)) {
                        delete e2pdf.element.buffered[key];
                    }
                }
            }
        },
        /*
         * e2pdf.element.hide
         */
        hide: function (el) {
            el.addClass('e2pdf-hide');
        },
        /*
         * e2pdf.element.show
         */
        show: function (el) {
            el.removeClass('e2pdf-hide');
        },
        /*
         * e2pdf.element.delete
         */
        delete: function (el) {
            el.remove();
            e2pdf.event.fire('after.element.delete');
        }
    },
    /*
     * e2pdf.wysiwyg
     */
    wysiwyg: {
        /*
         * e2pdf.wysiwyg.apply
         */
        apply: function (el) {
            var command = el.attr('data-command');
            var node = jQuery(e2pdf.wysiwyg.helper.getSelectedNode());
            if (command !== 'undo' && command !== 'redo' && command !== 'color') {
                if (node.hasClass('e2pdf-element')) {
                    var html_node = node;
                } else {
                    var html_node = node.closest('.e2pdf-element');
                }
                if (html_node && html_node.find('.e2pdf-html').length > 0) {
                    if (html_node.find('textarea.e2pdf-html').length > 0 || node.is('textarea')) {
                        alert(e2pdfLang['WYSIWYG Editor is disabled for this HTML Object']);
                        return;
                    }
                } else {
                    alert(e2pdfLang['WYSIWYG can be applied only to HTML Object']);
                    return;
                }
            }

            if (command === 'H1') {
                if (node.is("h1") && document.getSelection().toString() === node.text()) {
                    e2pdf.wysiwyg.clear('h1');
                } else {
                    var html = jQuery('<h1>').html(e2pdf.wysiwyg.helper.getSelectionHtml()).prop('outerHTML');
                    document.execCommand('insertHTML', false, html);
                }
            } else if (command === 'H2') {
                if (node.is("h2") && document.getSelection().toString() === node.text()) {
                    e2pdf.wysiwyg.clear('h2');
                } else {
                    var html = jQuery('<h2>').html(e2pdf.wysiwyg.helper.getSelectionHtml()).prop('outerHTML');
                    document.execCommand('insertHTML', false, html);
                }
            } else if (command === 'createlink') {
                url = prompt(e2pdfLang['Enter link here'] + ': ', 'http:\/\/');
                document.execCommand(command, false, url);
            } else if (command === 'font-size') {
                var font_size = el.find('option:selected').html();
                if (node.is("span") && document.getSelection().toString() === node.text()) {
                    var html = node.css('font-size', font_size + "px").prop('outerHTML');
                } else {
                    var html = jQuery('<span>').html(e2pdf.wysiwyg.helper.getSelectionHtml()).css('font-size', font_size + "px").prop('outerHTML');
                }
                document.execCommand('insertHTML', false, html);
                el.val('');
            } else if (command === 'font') {
                e2pdf.font.load(el);
                var font = el.find('option:selected').html();
                if (node.is("span") && document.getSelection().toString() === node.text()) {
                    var html = node.css('font-family', '"' + font + '"').prop('outerHTML');
                } else {
                    var html = jQuery('<span>').html(e2pdf.wysiwyg.helper.getSelectionHtml()).css('font-family', '"' + font + '"').prop('outerHTML');
                }
                document.execCommand('insertHTML', false, html);
                el.val('');
            } else if (command === 'color') {
                e2pdf.wysiwyg.helper.restoreSelection(e2pdf.static.selectionRange);
                var color = el.val();
                document.execCommand('foreColor', false, color);
                e2pdf.static.selectionRange = e2pdf.wysiwyg.helper.saveSelection();
            } else if (command === 'clear') {
                document.execCommand("removeformat", false, "");
                e2pdf.wysiwyg.clear();
            } else {
                document.execCommand(command, false, null);
            }

            e2pdf.event.fire('after.wysiwyg.apply');
        },
        /*
         * e2pdf.wysiwyg.clear
         */
        clear: function (tags) {
            if (!tags) {
                var tags = "h1,h2";
            }
            var array = tags.toLowerCase().split(",");
            e2pdf.wysiwyg.helper.getSelectedNodes().forEach(function (node) {
                if (node.nodeType === 1 &&
                        array.indexOf(node.tagName.toLowerCase()) > -1) {
                    e2pdf.wysiwyg.helper.replaceWithOwnChildren(node);
                }
            });
        },
        /*
         * e2pdf.wysiwyg.helper
         */
        helper: {
            /*
             * e2pdf.wysiwyg.helper.getSelectedNodes
             */
            getSelectedNodes: function () {
                var nodes = [];
                if (window.getSelection) {
                    var sel = window.getSelection();
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        nodes.push.apply(nodes, e2pdf.wysiwyg.helper.getRangeSelectedNodes(sel.getRangeAt(i), true));
                    }
                }
                return nodes;
            },
            /*
             * e2pdf.wysiwyg.helper.replaceWithOwnChildren
             */
            replaceWithOwnChildren: function (el) {
                var parent = el.parentNode;
                while (el.hasChildNodes()) {
                    parent.insertBefore(el.firstChild, el);
                }
                parent.removeChild(el);
            },
            /*
             * e2pdf.wysiwyg.helper.getRangeSelectedNodes
             */
            getRangeSelectedNodes: function (range, includePartiallySelectedContainers) {
                var node = range.startContainer;
                var endNode = range.endContainer;
                var rangeNodes = [];
                if (node === endNode) {
                    rangeNodes = [node];
                } else {
                    while (node && node !== endNode) {
                        rangeNodes.push(node = e2pdf.wysiwyg.helper.nextNode(node));
                    }
                    node = range.startContainer;
                    while (node && node !== range.commonAncestorContainer) {
                        rangeNodes.unshift(node);
                        node = node.parentNode;
                    }
                }

                if (includePartiallySelectedContainers) {
                    node = range.commonAncestorContainer;
                    while (node) {
                        rangeNodes.push(node);
                        node = node.parentNode;
                    }
                }

                return rangeNodes;
            },
            /*
             * e2pdf.wysiwyg.helper.getSelectedNode
             */
            getSelectedNode: function () {
                var node, selection;
                if (window.getSelection) {
                    selection = getSelection();
                    node = selection.anchorNode;
                }
                if (!node && document.selection) {
                    selection = document.selection;
                    var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
                    node = range.commonAncestorContainer ? range.commonAncestorContainer :
                            range.parentElement ? range.parentElement() : range.item(0);
                }
                if (node) {
                    return (node.nodeName === "#text" ? node.parentNode : node);
                }
            },
            /*
             * e2pdf.wysiwyg.helper.nextNode
             */
            nextNode: function (node) {
                if (node.hasChildNodes()) {
                    return node.firstChild;
                } else {
                    while (node && !node.nextSibling) {
                        node = node.parentNode;
                    }
                    if (!node) {
                        return null;
                    }
                    return node.nextSibling;
                }
            },
            /*
             * e2pdf.wysiwyg.helper.getSelectionHtml
             */
            getSelectionHtml: function () {
                var html = "";
                if (typeof window.getSelection != "undefined") {
                    var sel = window.getSelection();
                    if (sel.rangeCount) {
                        var container = document.createElement("div");
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents());
                        }
                        html = container.innerHTML;
                    }
                } else if (typeof document.selection != "undefined") {
                    if (document.selection.type === "Text") {
                        html = document.selection.createRange().htmlText;
                    }
                }
                return html;
            },
            /*
             * e2pdf.wysiwyg.helper.saveSelection
             */
            saveSelection: function () {
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        return sel.getRangeAt(0);
                    }
                } else if (document.selection && document.selection.createRange) {
                    return document.selection.createRange();
                }
                return null;
            },
            /*
             * e2pdf.wysiwyg.helper.restoreSelection
             */
            restoreSelection: function (range) {
                if (range) {
                    if (window.getSelection) {
                        sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (document.selection && range.select) {
                        range.select();
                    }
                }
            },
            /*
             * e2pdf.wysiwyg.helper.dropSelection()
             */
            dropSelection: function () {
                if (window.getSelection) {
                    sel = window.getSelection();
                    sel.removeAllRanges();
                }
            }
        }
    },
    /*
     * e2pdf.visual
     */
    visual: {
        /*
         * e2pdf.visual.mapper
         */
        mapper: {
            selected: null,
            /*
             * e2pdf.visual.mapper.init
             */
            init: function (el) {
                e2pdf.visual.mapper.selected = el;
                var modal = jQuery('<div>', {'data-modal': 'visual-mapper'});
                e2pdf.dialog.create(modal);
            },
            /*
             * e2pdf.visual.mapper.markup
             */
            markup: function () {
                e2pdf.dialog.rebuild();
            },
            /*
             * e2pdf.visual.mapper.rebuild
             */
            rebuild: function () {
                if (jQuery('#e2pdf-vm-content').length > 0) {
                    var vc_content = jQuery('#e2pdf-vm-content');
                    if (jQuery('.e2pdf-vm-wrapper').length > 0) {
                        jQuery('.e2pdf-vm-wrapper').remove();
                    }

                    vc_content.find('input[type="hidden"]').each(function () {
                        if (jQuery(this).attr('e2pdf-vm-hidden') != 'true') {
                            jQuery(this).attr('e2pdf-vm-hidden', 'true');
                        }
                    });
                    if (e2pdf.static.vm.hidden) {
                        vc_content.find('input[e2pdf-vm-hidden="true"]').each(function () {
                            jQuery(this).attr('type', 'text');
                        });
                    } else {
                        vc_content.find('input[e2pdf-vm-hidden="true"]').each(function () {
                            jQuery(this).attr('type', 'hidden');
                        });
                    }

                    var vc_wrapper = jQuery('<div>', {'class': 'e2pdf-vm-wrapper'});
                    vc_content.find('input[type="text"], input[type="radio"], input[type="checkbox"], input[type="password"], input[type="url"], input[type="number"], input[type="tel"], input[type="phone"], input[type="credit_card_cvc"], input[type="email"], input[type="color_picker"], input[type="range"], input[type="file"], input[type="date"], input[type="time"], button[type="upload"], textarea, select').each(function () {
                        vc_wrapper.append(e2pdf.visual.mapper.load(jQuery(this)));
                    });
                    vc_content.append(vc_wrapper);
                    if (e2pdf.pdf.settings.get('extension') == 'wordpress' || e2pdf.pdf.settings.get('extension') == 'woocommerce') {
                        jQuery('.e2pdf-dialog-visual-mapper input.e2pdf-hide[name="vm_search"]').removeClass('e2pdf-hide');
                    }
                }
            },
            /*
             * e2pdf.visual.mapper.clear
             */
            clear: function () {
                if (jQuery('.e2pdf-vm-wrapper').length > 0) {
                    jQuery('.e2pdf-vm-wrapper').remove();
                }
            },
            /*
             * e2pdf.visual.mapper.load
             */
            load: function (el) {
                var loaded = false;
                jQuery('.e2pdf-vm-field').removeClass('e2pdf-hide');
                if (el.is(":visible") && !el.hasClass('e2pdf-no-vm')) {
                    var width = el.css('width');
                    var height = el.css('height');
                    var top = el.offset().top - el.closest('#e2pdf-vm-content').offset().top;
                    var left = el.offset().left - el.closest('#e2pdf-vm-content').offset().left;
                    loaded = jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-vm-element'}).css({
                        'width': width, 'height': height, 'top': top, 'left': left
                    });
                    var name = el.attr('name');
                    var type = el.attr('type');
                    var value = el.attr('value');
                    if (el.is("select")) {
                        type = 'select';
                        value = '';
                        el.find('option').each(function () {
                            value += jQuery(this).attr('value');
                            if (jQuery(this)[0] !== el.find('option:last-child')[0]) {
                                value += "\n";
                            }
                        });
                    }

                    loaded.data('name', name);
                    loaded.data('type', type);
                    loaded.data('value', value);
                    jQuery('.e2pdf-vm-field').addClass('e2pdf-hide');
                }
                return loaded;
            },
            /*
             * e2pdf.visual.mapper.apply
             */
            apply: function (el) {
                if (e2pdf.visual.mapper.selected) {
                    var name = el.data('name');
                    var group = el.data('name');
                    var value = el.data('value');
                    var type = el.data('type');
                    if (!e2pdf.static.vm.replace) {
                        e2pdf.element.init(e2pdf.visual.mapper.selected);
                        name = e2pdf.properties.getValue(e2pdf.visual.mapper.selected, 'value') + name;
                    }

                    if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-checkbox') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'option', value);
                    } else if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-radio') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'group', group);
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'option', value);
                    } else if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-select') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'options', value);
                    } else if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-image') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                    } else if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-qrcode') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                    } else if (e2pdf.visual.mapper.selected.data('data-type') === 'e2pdf-barcode') {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                    } else {
                        e2pdf.properties.set(e2pdf.visual.mapper.selected, 'value', name);
                    }

                    e2pdf.properties.render(e2pdf.visual.mapper.selected);
                }

                if (e2pdf.static.vm.close) {
                    e2pdf.dialog.close();
                }
            }
        }
    },
    zoom: {
        zoom: 1,
        click: {
            x: 0,
            y: 0
        },
        apply: function (el) {
            jQuery('#e2pdf-tpl').removeClass(function (index, className) {
                return (className.match(/(^|\s)e2pdf-z\S+/g) || []).join(' ');
            });
            if (el.val() !== '100') {
                jQuery('#e2pdf-tpl').addClass("e2pdf-z" + el.val());
            }

            e2pdf.zoom.zoom = el.val() / 100;
            jQuery('#e2pdf-tpl').scrollLeft(((jQuery('.e2pdf-tpl-inner').width() * e2pdf.zoom.zoom) - jQuery('#e2pdf-tpl').width()) / 2);
        }
    }
};
jQuery(window).resize(function () {
    e2pdf.visual.mapper.clear();
    if (e2pdf.static.observer !== null) {
        e2pdf.static.observer.disconnect();
        e2pdf.static.observer = null;
    }
    if (this.e2pdfResizeTO) {
        clearTimeout(this.e2pdfResizeTO);
    }
    this.e2pdfResizeTO = setTimeout(function () {
        jQuery(this).trigger('e2pdfResizeEnd');
    }, 500);
});
jQuery(window).bind('e2pdfResizeEnd', function () {
    e2pdf.dialog.rebuild();
});
jQuery(document).on('change', 'input.e2pdf-collapse[type="checkbox"]', function (e) {
    var collapse = jQuery(this).attr('data-collapse');
    if (collapse) {
        if (jQuery(this).is(':checked')) {
            jQuery('.' + collapse).removeClass('e2pdf-hide');
        } else {
            jQuery('.' + collapse).addClass('e2pdf-hide');
        }
    }
});
jQuery(document).on('change', '.e2pdf-export-disposition input[type="radio"]', function (e) {
    if (jQuery(this).val() == 'attachment') {
        jQuery(this).closest('form').removeAttr('target');
    } else {
        jQuery(this).closest('form').attr('target', '_blank');
    }
});
jQuery(document).on('click', 'a.e2pdf-collapse', function (e) {
    var collapse = jQuery(this).attr('data-collapse');
    if (collapse) {
        if (jQuery(this).hasClass('e2pdf-collapsed')) {
            jQuery('.' + collapse).addClass('e2pdf-hide');
            jQuery(this).removeClass('e2pdf-collapsed');
        } else {
            jQuery('.' + collapse).removeClass('e2pdf-hide');
            jQuery(this).addClass('e2pdf-collapsed');
        }
    }
});
jQuery(document).ready(function () {
    jQuery(document).on('click', 'a.e2pdf-link[disabled="disabled"]', function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    });
    jQuery(document).on('click', '.e2pdf-action-add', function (e) {
        var actions = jQuery(this).closest('.e2pdf-actions-wrapper').find('.e2pdf-actions');
        var form = jQuery(this).closest('form');
        if (form.attr('id') === 'e2pdf-tpl-actions') {
            var element = jQuery('#e2pdf-tpl');
        } else if (form.attr('id') === 'e2pdf-page-options') {
            var element = jQuery('.e2pdf-page[data-page_id="' + form.find('input[name="page_id"]').val() + '"]').first();
        } else {
            var element = jQuery(".e2pdf-element[data-element_id='" + form.find('input[name="element_id"]').val() + "']").first();
        }
        e2pdf.actions.add(element, actions);
    });
    jQuery(document).on('click', '.e2pdf-action-condition-add', function (e) {
        var action_conditions = jQuery(this).closest('.e2pdf-action');
        var form = jQuery(this).closest('form');
        if (form.attr('id') === 'e2pdf-tpl-actions') {
            var element = jQuery('#e2pdf-tpl');
        } else if (form.attr('id') === 'e2pdf-page-options') {
            var element = jQuery('.e2pdf-page[data-page_id="' + form.find('input[name="page_id"]').val() + '"]');
        } else {
            var element = jQuery(".e2pdf-element[data-element_id='" + form.find('input[name="element_id"]').val() + "']").first();
        }

        e2pdf.actions.conditions.add(element, action_conditions);
    });
    jQuery(document).on('click', '.e2pdf-action-delete', function (e) {
        if (!confirm(e2pdfLang['Action will be removed! Are you sure want to continue?'])) {
            return false;
        }
        var action = jQuery(this).closest('.e2pdf-action');
        e2pdf.actions.delete(action);
    });
    jQuery(document).on('click', '.e2pdf-action-duplicate', function (e) {
        var action = jQuery(this).closest('.e2pdf-action');
        e2pdf.actions.duplicate(action);
    });
    jQuery(document).on('click', '.e2pdf-action-condition-delete', function (e) {
        var action = jQuery(this).closest('.e2pdf-action');
        if (action.find('.e2pdf-condition').length === 1) {
            alert(e2pdfLang["Last condition can't be removed"]);
            return false;
        }
        if (!confirm(e2pdfLang['Condition will be removed! Are you sure want to continue?'])) {
            return false;
        }
        var condition = jQuery(this).closest('.e2pdf-condition');
        e2pdf.actions.conditions.delete(condition);
    });
    jQuery(document).on('click', '.e2pdf-delete-reupload-page', function (e) {
        jQuery(this).closest('.e2pdf-grid').find('input[name^="positions"]').val('0');
    });
    jQuery(document).on('click', '.e2pdf-delete-pdf', function (e) {
        if (!confirm(e2pdfLang['Pre-uploaded PDF will be removed from E2Pdf Template! Are you sure want to continue?'])) {
            return false;
        }

        jQuery('#e2pdf-tpl .e2pdf-page').each(function () {
            var el = jQuery(this);
            el.css('background', '');
        });
        jQuery('.e2pdf-form-builder > input[name="pdf"]').val('');
    });
    jQuery(document).on('change', '#e2pdf-zoom', function (e) {
        e2pdf.zoom.apply(jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-extension', function (e) {
        e2pdf.request.submitRequest('e2pdf_extension', jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-item', function (e) {
        if (jQuery(this).val() == '-1') {
            jQuery(this).closest('form').find('#e2pdf-w-apply,#e2pdf-w-empty,#e2pdf-w-auto').attr('disabled', 'disabled');
            jQuery(this).closest('form').find('#e2pdf-item-options').removeClass('e2pdf-hide');
            jQuery(this).closest('form').find('#e2pdf-item-merged').addClass('e2pdf-hide');
            jQuery('#e2pdf-merged-item-dataset-title').addClass('e2pdf-hide');
            jQuery('#e2pdf-item-dataset-title').removeClass('e2pdf-hide');
        } else if (jQuery(this).val() == '-2') {
            jQuery(this).closest('form').find('#e2pdf-w-apply,#e2pdf-w-empty,#e2pdf-w-auto').attr('disabled', false);
            jQuery(this).closest('form').find('#e2pdf-item-options').addClass('e2pdf-hide');
            jQuery(this).closest('form').find('#e2pdf-item-merged').removeClass('e2pdf-hide');
            jQuery('#e2pdf-merged-item-dataset-title').removeClass('e2pdf-hide');
            jQuery('#e2pdf-item-dataset-title').addClass('e2pdf-hide');
        } else {
            jQuery(this).closest('form').find('#e2pdf-w-apply,#e2pdf-w-empty,#e2pdf-w-auto').attr('disabled', false);
            jQuery(this).closest('form').find('#e2pdf-item-options,#e2pdf-item-merged').addClass('e2pdf-hide');
            jQuery('#e2pdf-merged-item-dataset-title').addClass('e2pdf-hide');
            jQuery('#e2pdf-item-dataset-title').removeClass('e2pdf-hide');
        }
    });
    jQuery(document).on('change', '.e2pdf-action-action select, .e2pdf-action-property select, .e2pdf-action-format select', function (e) {
        var action = jQuery(this).closest('.e2pdf-action');
        e2pdf.actions.change(action, jQuery(this));
    });
    jQuery(document).on('click', '.e2pdf-tabs a', function (e) {
        jQuery(this).closest('.e2pdf-tabs-panel').find('.tabs-panel').hide();
        var tab = jQuery(this);
        tab.closest('ul').find('li').removeClass('active');
        tab.parent('li').addClass('active');
        jQuery(document.getElementById(tab.attr('data-tab'))).show();
    });
    jQuery(document).on('click', '.e2pdf-hidden-dropdown', function (e) {
        var parent = jQuery(this).closest('.e2pdf-closed');
        if (parent.hasClass('e2pdf-opened')) {
            parent.removeClass('e2pdf-opened');
        } else {
            jQuery('.e2pdf-closed').each(function () {
                jQuery(this).removeClass('e2pdf-opened');
            });
            parent.addClass('e2pdf-opened');
        }
    });
    jQuery(document).on('click', '.e2pdf-submit-form', function (e) {
        e.preventDefault();
        var el = jQuery(this);
        if (el.attr('form-id') == 'e2pdf-build-form' && el.hasClass('restore')) {
            if (!confirm(e2pdfLang['Saved Template will be overwritten! Are you sure want to continue?'])) {
                return false;
            }
        }
        e2pdf.request.submitForm(el);
    });
    jQuery(document).on('click', '.e2pdf-submit-local', function (e) {
        var el = jQuery(this);
        e2pdf.request.submitLocal(el);
    });
    jQuery(document).on('click', '.e2pdf-delete', function (e) {
        var message = Object.keys(e2pdf.element.selected).length > 1 ? e2pdfLang['Elements will be removed! Are you sure want to continue?'] : e2pdfLang['Element will be removed! Are you sure want to continue?'];
        if (!confirm(message)) {
            e2pdf.delete('.e2pdf-context');
            return false;
        }
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.delete(selected);
        }
        e2pdf.element.unselect();
    });
    jQuery(document).on('click', '.e2pdf-copy', function (e) {
        e2pdf.element.unbuffer();
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.copy(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-inner-context-menu > a', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });
    jQuery(document).on('mouseover', '.e2pdf-inner-context-menu', function (e) {
        jQuery(this).find('ul').show();
    });
    jQuery(document).on('mouseout', '.e2pdf-inner-context-menu', function (e) {
        jQuery(this).find('ul').hide();
    });
    jQuery(document).on('click', '.e2pdf-copy-style', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.copyStyle(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-paste-style', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.pasteStyle(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-copy-actions', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.copyActions(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-paste-actions', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.pasteActions(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-copy-width', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.copyWidth(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-paste-width', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.pasteWidth(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-copy-height', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.copyHeight(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-paste-height', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.pasteHeight(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-resize', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            selected.addClass('e2pdf-focused');
        }
    });
    jQuery(document).on('click', '.e2pdf-hidden', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.hide(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-unhidden', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.show(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-lock', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.properties.set(selected, 'locked', '1');
            selected.addClass('e2pdf-locked');
        }
    });
    jQuery(document).on('click', '.e2pdf-unlock', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.properties.set(selected, 'locked', '0');
            selected.removeClass('e2pdf-locked');
        }
    });
    jQuery(document).on('click', '.e2pdf-cut', function (e) {
        e2pdf.element.unbuffer();
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.element.cut(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-paste', function (e) {
        e2pdf.element.paste(false);
    });
    jQuery(document).on('click', '.e2pdf-pasteinplace', function (e) {
        e2pdf.element.paste(true);
    });
    jQuery(document).on('click', '.e2pdf-checkbox', function (e) {
        return false;
    });
    jQuery(document).on('click', '.e2pdf-radio', function (e) {
        return false;
    });
    jQuery(document).on('click', '.e2pdf-hidden-elements', function (e) {
        if (jQuery(this).hasClass('e2pdf-inactive')) {
            jQuery('html').addClass('e2pdf-show-all-elements');
            jQuery(this).removeClass('e2pdf-inactive');
        } else {
            jQuery('html').removeClass('e2pdf-show-all-elements');
            jQuery(this).addClass('e2pdf-inactive');
        }
    });
    jQuery(document).on('click', '.e2pdf-locked-elements', function (e) {
        if (jQuery(this).hasClass('e2pdf-inactive')) {
            jQuery('html').addClass('e2pdf-unlock-all-elements');
            jQuery(this).removeClass('e2pdf-inactive');
        } else {
            jQuery('html').removeClass('e2pdf-unlock-all-elements');
            jQuery(this).addClass('e2pdf-inactive');
        }
    });
    jQuery(document).on('click', '.e2pdf-add-page', function (e) {
        if (e2pdf.pdf.settings.get('pdf')) {
            alert(e2pdfLang['Adding new pages not available in "Uploaded PDF"']);
        } else if (e2pdfParams['license_type'] == 'FREE') {
            alert(e2pdfLang['Only 1 page allowed with "FREE" license type']);
        } else {
            e2pdf.pages.createPage();
        }
    });
    jQuery(document).on('click', '.e2pdf-create-pdf', function (e) {
        if (e2pdf.url.get('revision_id')) {
            alert(e2pdfLang['Not Available in Revision Edit Mode']);
            return false;
        }
        e2pdf.createPdf(jQuery(this));
    });
    jQuery(document).on('click', '.e2pdf-up-page', function (e) {
        e2pdf.pages.movePage(jQuery(this), 'up');
    });
    jQuery(document).on('click', '.e2pdf-down-page', function (e) {
        e2pdf.pages.movePage(jQuery(this), 'down');
    });
    jQuery(document).on('click', '.e2pdf-delete-page', function (e) {
        if (e2pdf.pdf.settings.get('pdf')) {
            if (!confirm(e2pdfLang['All pages will be removed! Are you sure want to continue?'])) {
                return false;
            }
            jQuery('#e2pdf-tpl .e2pdf-page').each(function () {
                var el = jQuery(this);
                e2pdf.pages.deletePage(el);
            });
        } else {
            if (!confirm(e2pdfLang['Are you sure want to remove page?'])) {
                return false;
            }
            var el = jQuery(jQuery(this));
            e2pdf.pages.deletePage(el);
        }
    });
    jQuery(document).on('click', '.e2pdf-delete-all-pages', function (e) {
        if (!confirm(e2pdfLang['All pages will be removed! Are you sure want to continue?'])) {
            return false;
        }
        jQuery('#e2pdf-tpl .e2pdf-page').each(function () {
            var el = jQuery(this);
            e2pdf.pages.deletePage(el);
        });
    });
    jQuery(document).on('click', '.e2pdf-delete-font', function (e) {
        if (!confirm(e2pdfLang['Are you sure want to remove font?'])) {
            return false;
        }
        var el = jQuery(jQuery(this));
        e2pdf.font.delete(el);
    });
    jQuery(document).on('click', '.e2pdf-modal', function (e) {
        e2pdf.dialog.create(jQuery(this));
    });
    jQuery(document).on('click', 'body', function (e) {
        e2pdf.delete('.e2pdf-context');
    });
    jQuery(document).on('change', '.e2pdf-export-template', function (e) {
        e2pdf.request.submitRequest('e2pdf_templates', jQuery(this));
    });
    jQuery(document).on('change', '.e2pdf-export-dataset', function (e) {
        if (jQuery(this).is('select')) {
            var data = {};
            data['id'] = jQuery('.e2pdf-export-template').val();
            data['datasets'] = {};
            jQuery('.e2pdf-export-dataset').each(function () {
                data['datasets'][jQuery(this).attr('name')] = jQuery(this).val();
            });
            e2pdf.request.submitRequest('e2pdf_dataset', jQuery(this), data);
        }
    });
    jQuery(document).on('change', 'fieldset.e2pdf-export-dataset input[type="checkbox"]', function (e) {
        if (jQuery(this).is(':checked')) {
            if (jQuery(this).val() == '') {
                jQuery(this).closest('fieldset').find('input[type="checkbox"]').prop('checked', true);
            }
        } else {
            if (jQuery(this).val() == '') {
                jQuery(this).closest('fieldset').find('input[type="checkbox"]').prop('checked', false);
            } else {
                jQuery(this).closest('fieldset').find('input[type="checkbox"][value=""]').prop('checked', false);
            }
        }

        if (jQuery(this).closest('fieldset').find('input[type="checkbox"]').length - 1 == jQuery(this).closest('fieldset').find('input[type="checkbox"]:checked').length) {
            jQuery(this).closest('fieldset').find('input[type="checkbox"][value=""]').prop('checked', true);
        }

        if (jQuery(this).closest('fieldset').find('input[type="checkbox"]:checked').length > 0) {
            jQuery('.e2pdf-export-form-submit').attr('disabled', false);
        } else {
            jQuery('.e2pdf-export-form-submit').attr('disabled', true);
        }
    });
    jQuery(document).on('change', '#e2pdf-font', function (e) {
        e2pdf.font.load(jQuery(this));
        e2pdf.font.apply(jQuery('#e2pdf-tpl'), jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-font-size', function (e) {
        e2pdf.font.size(jQuery('#e2pdf-tpl'), jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-text-align', function (e) {
        var text_align = jQuery(this).val();
        jQuery('#e2pdf-tpl .e2pdf-element ').each(function () {
            if (
                    jQuery(this).data('data-type') == 'e2pdf-input'
                    || jQuery(this).data('data-type') == 'e2pdf-textarea'
                    || jQuery(this).data('data-type') == 'e2pdf-html'
                    || jQuery(this).data('data-type') == 'e2pdf-page-number'
                    ) {
                if (e2pdf.properties.getValue(jQuery(this), 'text_align') == '') {
                    var children = e2pdf.element.children(jQuery(this));
                    children.css('text-align', text_align);
                }
            }
        });
    });
    jQuery(document).on('keydown', '.e2pdf-numbers', function (e) {
        if (jQuery.inArray(e.key, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', '+', '-', '.']) !== -1 ||
                jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 107, 109, 110, 189, 190]) !== -1 ||
                ((e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 67) && (e.ctrlKey === true || e.metaKey === true)) ||
                (e.shiftKey === true && e.keyCode === 187) ||
                (e.keyCode >= 35 && e.keyCode <= 40)
                ) {

            if ((e.keyCode === 189 || e.keyCode === 109 || e.key === '-') && !jQuery(this).hasClass('e2pdf-number-negative')) {
                e.preventDefault();
            } else if ((e.keyCode === 187 || e.keyCode === 107 || e.key === '+') && !jQuery(this).hasClass('e2pdf-number-positive')) {
                e.preventDefault();
            } else {
                return;
            }
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    jQuery(document).on('change', '.e2pdf-numbers', function (e) {
        var value = jQuery(this).val().trim();
        var prefix = '';
        if (jQuery(this).hasClass('e2pdf-number-positive') && value.startsWith('+')) {
            prefix = '+';
        }
        value = parseFloat(value);
        if (isNaN(value)) {
            value = 0;
        }
        jQuery(this).val(prefix + value);
    });
    jQuery(document).on('change', '#e2pdf-font-color', function (e) {
        e2pdf.font.fontcolor(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font-color'));
    });
    jQuery(document).on('change', '#e2pdf-rtl', function (e) {
        if (jQuery(this).is(':checked')) {
            jQuery('#e2pdf-tpl').attr('dir', 'rtl');
        } else {
            jQuery('#e2pdf-tpl').attr('dir', false);
        }
    });
    jQuery(document).on('change', '#e2pdf-line-height', function (e) {
        e2pdf.font.line(jQuery('#e2pdf-tpl'), jQuery(this));
    });
    jQuery(document).on('click', '.e2pdf-upload', function (e) {
        e.preventDefault();
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.mediaUploader.init(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-visual', function (e) {
        for (var key in e2pdf.element.selected) {
            var selected = e2pdf.element.selected[key];
            e2pdf.visual.mapper.init(selected);
        }
    });
    jQuery(document).on('click', '.e2pdf-apply-wysiwyg', function (e) {
        e2pdf.wysiwyg.apply(jQuery(this));
    });
    jQuery(document).on('click', '.e2pdf-apply-wysiwyg-color', function (e) {
        e2pdf.static.selectionRange = e2pdf.wysiwyg.helper.saveSelection();
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var color_panel = jQuery(this).parent().find('.wp-picker-container');
        if (!color_panel.hasClass('wp-picker-active')) {
            color_panel.find('.wp-color-result').click();
            if (color_panel.find('.wp-color-close').length === 0) {
                var close = jQuery('<a>', {"class": "wp-color-close", "href": "javascript:void(0);", 'onclick': "e2pdf.helper.color.close(this);"});
                var width = parseFloat(jQuery(this).css('width'));
                var height = parseFloat(jQuery(this).css('height'));
                close.css({'width': width, "height": height, "margin-top": -height});
                color_panel.append(close);
            }
        }
    });
    jQuery(document).on('change', '#e2pdf-wysiwyg-font-color', function (e) {
        e2pdf.wysiwyg.apply(jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-wysiwyg-fontsize', function (e) {
        e2pdf.wysiwyg.apply(jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-wysiwyg-font', function (e) {
        e2pdf.wysiwyg.apply(jQuery(this));
    });
    jQuery(document).on('change', '#e2pdf-upload-pdf', function (e) {
        e2pdf.request.upload('e2pdf_upload', jQuery('#e2pdf-w-upload'));
    });
    jQuery(document).on('click', '#e2pdf-w-reupload', function (e) {
        if (e2pdf.url.get('revision_id')) {
            alert(e2pdfLang['Not Available in Revision Edit Mode']);
            return false;
        }

        var message = "";
        if (e2pdf.static.unsaved) {
            message += e2pdfLang['WARNING: Template has changes after last save! Changes will be lost!'] + "\r\n";
        }
        message += e2pdfLang['Saved Template will be overwritten! Are you sure want to continue?'];
        jQuery(this).attr('disabled', 'disabled');
        jQuery(this).closest('form').append(
                jQuery('<div>', {'class': 'e2pdf-grid e2pdf-confirmation e2pdf-center e2pdf-mb20'}).append(
                jQuery('<div>', {'class': 'e2pdf-w100 e2pdf-mb5'}).text(message),
                jQuery('<div>', {'class': 'e2pdf-w100'}).append(
                jQuery('<div>', {'class': 'e2pdf-ib e2pdf-pr5'}).append(
                jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-confirmation-confirm e2pdf-link button'}).html(e2pdfLang['Confirm'])
                ),
                jQuery('<div>', {'class': 'e2pdf-ib e2pdf-pl5'}).append(
                jQuery('<a>', {'href': 'javascript:void(0);', 'class': 'e2pdf-confirmation-cancel e2pdf-link button'}).html(e2pdfLang['Cancel'])
                )
                )
                )
                );
    });
    jQuery(document).on('change', '#e2pdf-revision', function (e) {
        if (e2pdf.static.unsaved) {
            if (!confirm(e2pdfLang['WARNING: Template has changes after last save! Changes will be lost!'])) {
                var revision_id = e2pdf.url.get('revision_id') ? e2pdf.url.get('revision_id') : '0';
                jQuery(this).val(revision_id);
                return false;
            }
        }
        e2pdf.static.unsaved = false;
        var revision_id = jQuery(this).val();
        var template_id = e2pdf.pdf.settings.get('ID');
        var url = e2pdf.url.build('e2pdf-templates', 'action=edit&id=' + template_id + '&revision_id=' + revision_id);
        if (revision_id === '0') {
            url = e2pdf.url.build('e2pdf-templates', 'action=edit&id=' + template_id);
        }
        jQuery(this).attr('disabled', 'disabled');
        location.href = url;
    });
    jQuery(document).on('click', '#e2pdf-unlink-license-key', function (e) {
        if (!confirm(e2pdfLang['Website will be forced to use "FREE" License Key! Are you sure want to continue?'])) {
            return false;
        }
        var data = {};
        e2pdf.request.submitRequest('e2pdf_license_key', jQuery(this), data);
    });
    jQuery(document).on('click', '#e2pdf-deactivate-all-templates', function (e) {
        if (!confirm(e2pdfLang['All Templates for this Website will be deactivated! Are you sure want to continue?'])) {
            return false;
        }
        jQuery(this).html(e2pdfLang['In Progress...']);
        var data = {};
        e2pdf.request.submitRequest('e2pdf_deactivate_all_templates', jQuery(this), data);
    });
    jQuery(document).on('click', '#e2pdf-restore-license-key', function (e) {
        var data = {};
        jQuery(this).closest('.e2pdf-notice').html(e2pdfLang['In Progress...']);
        e2pdf.request.submitRequest('e2pdf_restore_license_key', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-confirmation-confirm', function (e) {
        jQuery(this).closest('.e2pdf-confirmation').remove();
        jQuery('#e2pdf-w-reupload').attr('disabled', false);
        jQuery('#e2pdf-reupload-pdf').click();
    });
    jQuery(document).on('click', '.e2pdf-confirmation-cancel', function (e) {
        jQuery(this).closest('.e2pdf-confirmation').remove();
        jQuery('#e2pdf-w-reupload').attr('disabled', false);
    });
    jQuery(document).on('change', '#e2pdf-reupload-pdf', function (e) {
        e2pdf.request.upload('e2pdf_reupload', jQuery('#e2pdf-w-reupload'));
    });
    jQuery(document).on('click', '.e2pdf-el-properties input[name="group"]', function (e) {
        jQuery(this).autocomplete("search", "");
    });
    jQuery(document).on('click', '.e2pdf-el-properties input[name="wysiwyg_disable"]', function (e) {
        if (!jQuery(this).is(':checked')) {
            if (!confirm(e2pdfLang['Enabling WYSIWYG can affect "HTML" Source'])) {
                return false;
            }
        }
    });
    jQuery(document).on('change', '.e2pdf-settings-style-change', function (e) {
        e2pdf.event.fire('after.settings.style.change');
    });
    jQuery(document).on('change keyup', '.e2pdf-settings-template-change', function (e) {
        e2pdf.event.fire('after.settings.template.change');
    });
    jQuery(document).on('keyup', '.e2pdf-export-dataset-search', function (e) {
        var search = jQuery(this).val();
        var key = jQuery(this).attr('field');
        var dataset_field = jQuery('.e2pdf-export-dataset[name="' + jQuery(this).attr('field') + '"]');
        var options = dataset_field.empty().data('options');
        var regex = new RegExp(search, "gi");
        var selected = 0;
        jQuery.each(options, function (i) {
            var option = options[i];
            if (i == 0 || option.value.match(regex) !== null) {
                if (e2pdf.url.get('action') == 'bulk') {
                    dataset_field.append(jQuery('<div>', {'class': 'e2pdf-ib e2pdf-w100'}).append(jQuery('<label>').html(option.value).prepend(jQuery('<input>', {'name': key + '[]', 'type': 'checkbox', 'value': option.key}))));
                } else {
                    dataset_field.append(jQuery('<option>', {'value': option.key}).html(option.value));
                    if ((selected == 0 && i !== 0) || (search === '' && i === 0)) {
                        dataset_field.val(option.key);
                        selected = 1;
                    }
                }
            }
        });
        if (e2pdf.url.get('action') == 'bulk') {
            dataset_field.find('input[type="checkbox"][value=""]').prop('checked', true).trigger('change');
            if (dataset_field.find('input[type="checkbox"]').length > 1) {
                jQuery('.e2pdf-export-form-submit').attr('disabled', false);
            } else {
                dataset_field.find('input[type="checkbox"]').attr('disabled', true);
                jQuery('.e2pdf-export-form-submit').attr('disabled', true);
            }
        }
        if (this.datasetLoad) {
            clearTimeout(this.datasetLoad);
        }
        this.datasetLoad = setTimeout(function () {
            dataset_field.trigger('change');
        }, 1000);
    });
    jQuery(document).on('change', 'select[name="preset"]', function (e) {
        if (jQuery(this).val() !== '') {
            var form = jQuery(this).closest('form');
            var size = e2pdfTemplateSizes[jQuery(this).val()];
            form.find('input[name="width"]').val(size.width);
            form.find('input[name="height"]').val(size.height);
        }
    });
    jQuery(document).on('click', '.e2pdf-vm-element', function (e) {
        e2pdf.visual.mapper.apply(jQuery(this));
    });
    jQuery(document).on('dblclick', '.e2pdf-drag', function (e) {
        e2pdf.element.unselect();
        e2pdf.element.unfocus();
        var el = jQuery(this).closest('.e2pdf-element');
        e2pdf.element.focus(el);
    });
    jQuery(document).on('click', '.e2pdf-drag', function (e) {
        var el = jQuery(this).closest('.e2pdf-element');
        e2pdf.element.unfocus();
        if (e.ctrlKey || e.metaKey) {
            if (el.hasClass('e2pdf-selected')) {
                e2pdf.element.unselect(el);
            } else {
                e2pdf.element.select(el);
            }
        } else {
            if (el.hasClass('e2pdf-selected')) {
                if (Object.keys(e2pdf.element.selected).length > 1) {
                    e2pdf.element.unselect();
                    e2pdf.element.select(el);
                } else {
                    e2pdf.element.unselect(el);
                }
            } else {
                if (Object.keys(e2pdf.element.selected).length > 0) {
                    e2pdf.element.unselect();
                    e2pdf.element.select(el);
                } else {
                    e2pdf.element.select(el);
                }
            }
        }
    });
    jQuery(document).on('click', '.e2pdf-activate-template', function (e) {
        var data = {};
        data['id'] = jQuery(this).attr('data-id');
        e2pdf.request.submitRequest('e2pdf_activate_template', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-deactivate-template', function (e) {
        var data = {};
        data['id'] = jQuery(this).attr('data-id');
        e2pdf.request.submitRequest('e2pdf_deactivate_template', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-delete-item', function (e) {
        e.preventDefault();
        if (!confirm(e2pdfLang['Dataset will be removed! Are you sure want to continue?'])) {
            return false;
        }
        var data = {};
        data['template'] = jQuery(this).attr('template');
        data['dataset'] = jQuery(this).attr('dataset');
        e2pdf.request.submitRequest('e2pdf_delete_item', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-delete-items', function (e) {
        e.preventDefault();
        if (!confirm(e2pdfLang['All datasets will be removed! Are you sure to continue?'])) {
            return false;
        }
        var data = {};
        data['template'] = jQuery(this).attr('template');
        e2pdf.request.submitRequest('e2pdf_delete_items', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-bulk-action', function (e) {
        e.preventDefault();
        if (jQuery(this).attr('action') == 'start') {
            if (!confirm(e2pdfLang['The bulk export task will be started! Are you sure to continue?'])) {
                return false;
            }
        } else if (jQuery(this).attr('action') == 'stop') {
            if (!confirm(e2pdfLang['The bulk export task will be stopped! Are you sure to continue?'])) {
                return false;
            }
        } else if (jQuery(this).attr('action') == 'delete') {
            if (!confirm(e2pdfLang['The bulk export task will be removed! Are you sure to continue?'])) {
                return false;
            }
        }

        var data = {};
        data['bulk'] = jQuery(this).attr('bulk');
        data['action'] = jQuery(this).attr('action');
        e2pdf.request.submitRequest('e2pdf_bulk_action', jQuery(this), data);
    });
    jQuery(document).on('click', '.e2pdf-copy-field', function (e) {
        jQuery(this).select();
    });
    jQuery(document).on('click focus', '.e2pdf-autocomplete-cl', function (e) {
        jQuery(this).autocomplete("search", '');
    });
    jQuery(document).on('change', 'input[name="vm_hidden"]', function (e) {
        if (jQuery(this).is(':checked')) {
            e2pdf.static.vm.hidden = true;
        } else {
            e2pdf.static.vm.hidden = false;
        }
        e2pdf.visual.mapper.rebuild();
    });
    jQuery(document).on('keyup', 'input[name="vm_search"]', function (e) {
        var value = jQuery(this).val();
        if (value != '') {
            jQuery('.e2pdf-vm-content').find('.e2pdf-vm-item, h3').hide();
            jQuery('.e2pdf-vm-content').find('label').filter(function (c) {
                return jQuery(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0;
            }).closest('.e2pdf-vm-item').show().closest('.e2pdf-grid').prev('h3').show();
            jQuery('.e2pdf-vm-content').find('input').filter(function (c) {
                return jQuery(this).val().toLowerCase().indexOf(value.toLowerCase()) >= 0;
            }).closest('.e2pdf-vm-item').show().closest('.e2pdf-grid').prev('h3').show();
            jQuery('.e2pdf-vm-content').find('h3').filter(function (c) {
                return jQuery(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0;
            }).show().next('.e2pdf-grid').find('.e2pdf-vm-item').show();
        } else {
            jQuery('.e2pdf-vm-content').find('.e2pdf-vm-item, h3').show();
        }

        e2pdf.visual.mapper.rebuild();
    });
    jQuery(document).on('change', 'input[name="vm_replace"]', function (e) {
        if (jQuery(this).is(':checked')) {
            e2pdf.static.vm.replace = true;
        } else {
            e2pdf.static.vm.replace = false;
        }
    });
    jQuery(document).on('change', 'input[name="vm_close"]', function (e) {
        if (jQuery(this).is(':checked')) {
            e2pdf.static.vm.close = true;
        } else {
            e2pdf.static.vm.close = false;
        }
    });
    if (jQuery('.e2pdf-form-builder > input[name="sub_action"]').length > 0) {
        e2pdf.pdf.settings.set('sub_action', jQuery('.e2pdf-form-builder > input[name="sub_action"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="ID"]').length > 0) {
        e2pdf.pdf.settings.set('ID', jQuery('.e2pdf-form-builder > input[name="ID"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="width"]').length > 0) {
        e2pdf.pdf.settings.set('width', jQuery('.e2pdf-form-builder > input[name="width"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="height"]').length > 0) {
        e2pdf.pdf.settings.set('height', jQuery('.e2pdf-form-builder > input[name="height"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="extension"]').length > 0) {
        e2pdf.pdf.settings.set('extension', jQuery('.e2pdf-form-builder > input[name="extension"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="item"]').length > 0) {
        e2pdf.pdf.settings.set('item', jQuery('.e2pdf-form-builder > input[name="item"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="item1"]').length > 0) {
        e2pdf.pdf.settings.set('item1', jQuery('.e2pdf-form-builder > input[name="item1"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="item2"]').length > 0) {
        e2pdf.pdf.settings.set('item2', jQuery('.e2pdf-form-builder > input[name="item2"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="item"]').length > 0) {
        e2pdf.pdf.settings.set('pdf', jQuery('.e2pdf-form-builder > input[name="pdf"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="format"]').length > 0) {
        e2pdf.pdf.settings.set('format', jQuery('.e2pdf-form-builder > input[name="format"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="activated"]').length > 0) {
        e2pdf.pdf.settings.set('activated', jQuery('.e2pdf-form-builder > input[name="activated"]').val());
    }

    if (jQuery('.e2pdf-form-builder > input[name="templates_limit"]').length > 0) {
        e2pdf.pdf.settings.set('templates_limit', jQuery('.e2pdf-form-builder > input[name="templates_limit"]').val());
    }

    jQuery('#e2pdf-zoom').trigger('change');
    if (jQuery('body').hasClass('toplevel_page_e2pdf')) {
        if (e2pdf.url.get('id')) {
            if (jQuery(".e2pdf-export-template option[value=" + e2pdf.url.get('id') + "]").length == 0) {
                jQuery('.e2pdf-export-template').attr('disabled', false).removeClass('e2pdf-onload').val('0').change();
            } else {
                e2pdf.static.autoloadExport = true;
                jQuery('.e2pdf-export-template').attr('disabled', false).removeClass('e2pdf-onload').val(e2pdf.url.get('id')).change();
            }
        }
    }

    if (jQuery('body').hasClass('e2pdf_page_e2pdf-templates')) {
        jQuery('.e2pdf-color-picker-load').each(function () {
            jQuery(this).wpColorPicker(
                    {
                        defaultColor: function () {
                            var el = jQuery(event.target).parent().find('.e2pdf-color-picker');
                            if (el.attr('data-default')) {
                                return el.attr('data-default');
                            } else {
                                return;
                            }
                        },
                        change: function (event, ui) {
                            jQuery(this).val(ui.color.toString()).change();
                        }
                    }
            ).removeClass('e2pdf-color-picker-load');
        });
        jQuery(window).bind("beforeunload", function (e) {
            if (e2pdf.static.unsaved) {
                var confirmationMessage = "\o/";
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }
        });
        if (jQuery('#e2pdf-build-form').length > 0) {
            postboxes.add_postbox_toggles(pagenow);
        }

        if (typeof (jQuery.ui) != 'undefined' && typeof (jQuery.ui.draggable) != 'undefined'
                && typeof (jQuery.ui.droppable) != 'undefined'
                && jQuery('#e2pdf-tpl').length > 0) {

            /*
             * jQuery UI scale bug fix
             */
            jQuery.ui.ddmanager.prepareOffsets = function (t, event) {
                var i, j,
                        m = jQuery.ui.ddmanager.droppables[ t.options.scope ] || [],
                        type = event ? event.type : null,
                        list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                droppablesLoop: for (i = 0; i < m.length; i++) {
                    if (m[ i ].options.disabled || (t && !m[ i ].accept.call(m[ i ].element[ 0 ], (t.currentItem || t.element)))) {
                        continue;
                    }
                    for (j = 0; j < list.length; j++) {
                        if (list[ j ] === m[ i ].element[ 0 ]) {
                            m[ i ].proportions().height = 0;
                            continue droppablesLoop;
                        }
                    }
                    m[ i ].visible = m[ i ].element.css("display") !== "none";
                    if (!m[ i ].visible) {
                        continue;
                    }
                    if (type === "mousedown") {
                        m[ i ]._activate.call(m[ i ], event);
                    }
                    m[ i ].offset = m[ i ].element.offset();
                    m[ i ].proportions({width: m[ i ].element[ 0 ].offsetWidth * e2pdf.zoom.zoom, height: m[ i ].element[ 0 ].offsetHeight * e2pdf.zoom.zoom});
                }
            };
            jQuery('#e2pdf-tpl').data('data-type', 'e2pdf-tpl');
            var actions = JSON.parse(jQuery(".e2pdf-load-tpl").find('.e2pdf-data-actions').text());
            e2pdf.actions.apply(jQuery('#e2pdf-tpl'), actions);
            jQuery(".e2pdf-load-tpl").remove();
            jQuery(".e2pdf-load-el").each(function () {
                var element = jQuery(this);
                var type = element.attr('data-type');
                var page = element.closest('.e2pdf-page');
                var properties = JSON.parse(element.find('.e2pdf-data-properties').text());
                var actions = JSON.parse(element.find('.e2pdf-data-actions').text());
                properties['width'] = element.attr('data-width');
                properties['height'] = element.attr('data-height');
                properties['top'] = element.attr('data-top');
                properties['left'] = element.attr('data-left');
                if (type == 'e2pdf-html') {
                    if (properties['wysiwyg_disable'] == '1') {
                        properties['value'] = element.find('.e2pdf-data-value').text();
                    } else {
                        properties['value'] = element.find('.e2pdf-data-value').html();
                    }
                } else if (type == 'e2pdf-page-number') {
                    properties['value'] = element.find('.e2pdf-data-value').html();
                } else {
                    properties['value'] = element.find('.e2pdf-data-value').text();
                }
                properties['name'] = element.find('.e2pdf-data-name').text();
                var el = e2pdf.element.create(type, page, properties, actions, false, true, element.attr('data-element_id'));
                jQuery(this).replaceWith(el);
                e2pdf.properties.render(el);
            });
            jQuery(".e2pdf-load-page").each(function () {
                var page = jQuery(this);
                var actions = JSON.parse(page.find('.e2pdf-data-actions').text());
                var properties = JSON.parse(page.find('.e2pdf-data-properties').text());
                page.find('.e2pdf-data-properties').remove();
                page.find('.e2pdf-data-actions').remove();
                page.removeClass('e2pdf-load-page');
                e2pdf.pages.createPage(page, properties, actions);
            });
            jQuery(".e2pdf-be").draggable({
                helper: function () {
                    var element = jQuery(this).clone();
                    var type = element.attr('data-type');
                    var page = element.closest('.e2pdf-page');
                    var el = e2pdf.element.create(type, page, false, false, true);
                    e2pdf.font.apply(el, jQuery('#e2pdf-font'));
                    e2pdf.font.size(el, jQuery('#e2pdf-font-size'));
                    e2pdf.font.line(el, jQuery('#e2pdf-line-height'));
                    e2pdf.font.fontcolor(el, jQuery('#e2pdf-font-color'));
                    e2pdf.properties.render(el);
                    el.css('z-index', 1);
                    if (e2pdf.zoom.zoom != 1) {
                        el.css('transform', 'scale(' + e2pdf.zoom.zoom + ')');
                        el.css('transform-origin', '0 0');
                    }
                    return el;
                },
                start: function (ev, ui) {
                    e2pdf.static.guide.x = ev.originalEvent.pageX - jQuery(this).offset().left;
                    e2pdf.static.guide.y = ev.originalEvent.pageY - jQuery(this).offset().top;
                    e2pdf.element.unselect();
                },
                stop: function (ev, ui) {
                    jQuery(".e2pdf-guide-v, .e2pdf-guide-h").hide();
                },
                drag: function (ev, ui) {

                    if (e2pdf.static.drag.page !== null) {

                        var pos = {left: ev.originalEvent.pageX - e2pdf.static.guide.x, top: ev.originalEvent.pageY - e2pdf.static.guide.y};
                        var guides = {top: {dist: e2pdf.static.guide.distance + 1}, left: {dist: e2pdf.static.guide.distance + 1}};
                        var w = parseFloat(jQuery(ui.helper).css('width')) * e2pdf.zoom.zoom;
                        var h = parseFloat(jQuery(ui.helper).css('height')) * e2pdf.zoom.zoom;
                        var el_guides = e2pdf.guide.calc(null, pos, w, h, true);
                        jQuery.each(e2pdf.static.guide.guides, function (i, guide) {
                            jQuery.each(el_guides, function (i, elemGuide) {
                                if (guide.type == elemGuide.type) {
                                    var prop = guide.type == "h" ? "top" : "left";
                                    var d = Math.abs(elemGuide[prop] - guide[prop]);
                                    if (d < guides[prop].dist) {
                                        guides[prop].dist = d;
                                        guides[prop].offset = elemGuide[prop] - pos[prop];
                                        guides[prop].guide = guide;
                                    }
                                }
                            });
                        });
                        if (guides.top.dist <= e2pdf.static.guide.distance) {
                            e2pdf.static.drag.page.find('.e2pdf-guide-h').css("top", guides.top.guide.top / e2pdf.zoom.zoom - e2pdf.static.drag.page.offset().top / e2pdf.zoom.zoom - 1).show();
                            var snap_top = guides.top.guide.top - guides.top.offset - jQuery(this).offset().top;
                            ui.position.top = snap_top;
                        } else {
                            jQuery(".e2pdf-guide-h").hide();
                        }

                        if (guides.left.dist <= e2pdf.static.guide.distance) {
                            e2pdf.static.drag.page.find('.e2pdf-guide-v').css("left", guides.left.guide.left / e2pdf.zoom.zoom - e2pdf.static.drag.page.offset().left / e2pdf.zoom.zoom - 1).show();
                            var snap_left = guides.left.guide.left - guides.left.offset - jQuery(this).offset().left + 5;
                            ui.position.left = snap_left;
                        } else {
                            jQuery(".e2pdf-guide-v").hide();
                        }
                    }
                }
            });
            e2pdf.welcomeScreen();
        }
        e2pdf.font.load(jQuery('#e2pdf-font'));
        jQuery('.e2pdf-load-font').each(function () {
            e2pdf.font.load(jQuery(this));
            jQuery(this).remove();
        });
        e2pdf.font.apply(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font'));
        e2pdf.font.size(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font-size'));
        e2pdf.font.line(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-line-height'));
        e2pdf.font.fontcolor(jQuery('#e2pdf-tpl'), jQuery('#e2pdf-font-color'));
    }

    jQuery(document).keydown(function (e) {
        if (jQuery(e.target).closest('.e2pdf-dialog-visual-mapper').length == 0
                && jQuery(e.target).closest('.e2pdf-dialog-element-properties').length == 0
                && Object.keys(e2pdf.element.selected).length > 0
                && jQuery.inArray(e.which, [37, 38, 39, 40, 46]) !== -1) {
            e.preventDefault();
            switch (e.which) {
                case 37:
                    /*
                     * left
                     */
                    var diff = 1;
                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        if (parseFloat(selected.css('left')) > 0) {
                            if (parseFloat(selected.css('left')) - 1 < 0) {
                                diff = Math.min(diff, selected.css('left'));
                            }
                        } else {
                            diff = Math.min(diff, 0);
                        }
                    }

                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        selected.finish().animate({
                            left: "-=" + diff
                        }, 0);
                        e2pdf.properties.set(selected, 'left', e2pdf.helper.pxToFloat(selected.css('left')));
                    }
                    break;
                case 38:
                    /*
                     * top
                     */
                    var diff = 1;
                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        if (parseFloat(selected.css('top')) > 0) {
                            if (parseFloat(selected.css('top')) - 1 < 0) {
                                diff = Math.min(diff, selected.css('top'));
                            }
                        } else {
                            diff = Math.min(diff, 0);
                        }
                    }

                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        selected.finish().animate({
                            top: "-=" + diff
                        }, 0);
                        e2pdf.properties.set(selected, 'top', e2pdf.helper.pxToFloat(selected.css('top')));
                    }
                    break;
                case 39:
                    /* 
                     * right
                     */
                    var diff = 1;
                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        if (parseFloat(selected.css('right')) > 0) {
                            if (parseFloat(selected.css('right')) - 1 < 0) {
                                diff = Math.min(diff, selected.css('right'));
                            }
                        } else {
                            diff = Math.min(diff, 0);
                        }
                    }

                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        selected.finish().animate({
                            left: "+=" + diff
                        }, 0);
                        e2pdf.properties.set(selected, 'left', e2pdf.helper.pxToFloat(selected.css('left')));
                    }
                    break;
                case 40:
                    /*
                     * down
                     */
                    var diff = 1;
                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        if (parseFloat(selected.css('bottom')) > 0) {
                            if (parseFloat(selected.css('bottom')) - 1 < 0) {
                                diff = Math.min(diff, selected.css('bottom'));
                            }
                        } else {
                            diff = Math.min(diff, 0);
                        }
                    }

                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        selected.finish().animate({
                            top: "+=" + diff
                        }, 0);
                        e2pdf.properties.set(selected, 'top', e2pdf.helper.pxToFloat(selected.css('top')));
                    }
                    break;
                case 46:
                    /*
                     * delete
                     */
                    var message = Object.keys(e2pdf.element.selected).length > 1 ? e2pdfLang['Elements will be removed! Are you sure want to continue?'] : e2pdfLang['Element will be removed! Are you sure want to continue?'];
                    if (!confirm(message)) {
                        e2pdf.delete('.e2pdf-context');
                        return false;
                    }

                    for (var key in e2pdf.element.selected) {
                        var selected = e2pdf.element.selected[key];
                        e2pdf.element.delete(selected);
                    }

                    e2pdf.element.unselect();
                    break;
            }
        }
    });
    jQuery(document).on('mousedown', 'body', function (e) {
        if (!jQuery(e.target).hasClass('e2pdf-drag') &&
                jQuery(e.target).closest('.e2pdf-context-menu').length == 0 &&
                jQuery(e.target).closest('.e2pdf-element').length == 0 &&
                jQuery(e.target).closest('.e2pdf-dialog-visual-mapper').length == 0 &&
                jQuery(e.target).closest('.e2pdf-dialog-element-properties').length == 0 &&
                jQuery(e.target).closest('.e2pdf-panel-options').length == 0 &&
                jQuery(e.target).closest('.e2pdf-wysiwyg-color').length == 0 &&
                e.ctrlKey !== true) {
            e2pdf.element.unselect();
            e2pdf.element.unfocus();
        }
        if (jQuery(e.target).closest('.e2pdf-closed').length == 0) {
            jQuery('.e2pdf-closed').each(function () {
                jQuery(this).removeClass('e2pdf-opened');
            });
        }
    });
    jQuery('.e2pdf-onload .disabled, .e2pdf-onload [disabled="disabled"], .e2pdf-onload[disabled="disabled"]').removeClass('disabled').attr('disabled', false);
    jQuery('.e2pdf-onload').removeClass('e2pdf-onload');
    if (jQuery('.e2pdf-bulks-list').length > 0)
    {
        e2pdf.bulk.progress();
    }
});