/* jshint browser:true */
/* global require */
require(['jquery', 'underscore', 'oro/translator', 'oro/app', 'oro/mediator', 'oro/messenger'],
function ($, _, __, app, mediator, messenger) {
    'use strict';

    /* ============================================================
     * from user.js
     * ============================================================ */
    $(function () {
        function initFlashMessages() {
            messenger.showQueuedMessages();
        }

        $(document).on('click', '#btn-apigen', function () {
            var el = $(this);

            $.get(el.attr('href'), function (data) {
                el.closest('.AknFieldContainer').find('.AknTextField').text(data);
                var messageText = el.attr('data-message') + ' <strong>' + data + '</strong>';
                messenger.notify('success', messageText);
            });

            return false;
        });

        /**
         * Process flash messages stored in queue or storage
         */
        mediator.on('hash_navigation_request:complete', initFlashMessages);
    });
});
