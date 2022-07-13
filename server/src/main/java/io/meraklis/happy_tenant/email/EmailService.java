package io.meraklis.happy_tenant.email;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import io.meraklis.happy_tenant.tenant.Tenant;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${email.sendgrid-api-key}")
    private String sendGridKey;

    @Value("${email.no-reply}")
    private String noReplyEmail;

    @Value("${tenant-portal-login-url}")
    private String tenantPortalLoginUrl;

    @Autowired
    private Handlebars handlebars;

    public void sendInvite(Tenant tenant) throws IOException {
        Template template = handlebars.compile("tenant_invite");
        Map<String, String> params = new HashMap<>();
        params.put("fullName", tenant.getFullName());
        params.put("tenantPortalLoginUrl", tenantPortalLoginUrl);
        String appliedTemplate = template.apply(params);

        Email from = new Email(noReplyEmail);
        String subject = "Welcome to Meraklis.io Tenant Portal!";
        Email to = new Email(tenant.getEmail());
        Content content = new Content("text/html", appliedTemplate);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
