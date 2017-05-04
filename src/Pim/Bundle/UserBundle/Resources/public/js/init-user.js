/* global require */
'use strict';

define(['jquery', 'underscore', 'oro/translator', 'oro/app', 'oro/mediator', 'oro/messenger'],
    function () {
        // $, _, __, app, mediator, messenger

        /* ============================================================
         * from user.js
         * ============================================================ */
        return function () {
            // function initFlashMessages() {
            //     messenger.showQueuedMessages();
            // }

            // $.get(el.attr('href'), function (data) {
            //     el.closest('.AknFieldContainer').find('.AknTextField').text(data);
            //     var messageText = el.attr('data-message') + ' <strong>' + data + '</strong>';
            //     messenger.notify('success', messageText);
            // });

            // $(document).on('click', '#btn-apigen', function () {
            //     var el = $(this);

            //     $.get(el.attr('href'), function (data) {
            //         el.closest('.AknFieldContainer').find('.AknTextField').text(data);
            //         var messageText = el.attr('data-message') + ' <strong>' + data + '</strong>';
            //         messenger.notify('success', messageText);
            //     });

            //     return false;
            // });

            // /**
            //  * Process flash messages stored in queue or storage
            //  */
            // mediator.on('route_complete', initFlashMessages);
        }
    }
);
