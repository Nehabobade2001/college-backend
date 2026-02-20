"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MJMLAdapter = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const mjml2html = require("mjml");
class MJMLAdapter extends handlebars_adapter_1.HandlebarsAdapter {
    compile(mail, callback, options) {
        if (mail.data.html) {
            super.compile(mail, callback, options);
        }
        else {
            super.compile(mail, () => {
                const regex = /<mjml\b[^>]*>(.*?)<\/mjml>/s;
                const match = mail?.data?.html?.match(regex);
                if (match) {
                    const contentBetweenMjml = match[1];
                    mail.data.html = mjml2html('<mjml>' + contentBetweenMjml + '</mjml>mjml>').html;
                }
                else {
                    console.log('No match found');
                }
                callback();
            }, options);
        }
    }
}
exports.MJMLAdapter = MJMLAdapter;
//# sourceMappingURL=mjml.adapter.js.map