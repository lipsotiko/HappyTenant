package io.meraklis.happy_tenant.configuration;

import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import com.github.jknack.handlebars.io.TemplateLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HandlebarsTemplateConfiguration {

    @Bean
    public Handlebars getHandlebarsTemplate() {
        TemplateLoader loader = new ClassPathTemplateLoader();
        loader.setPrefix("/templates/email");
        loader.setSuffix(".html");
        return new Handlebars(loader);
    }

}
