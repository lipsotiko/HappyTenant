package io.meraklis.happy_tenant.configuration;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class StaticContentFilter implements Filter {

    // https://stackoverflow.com/questions/53931046/spring-check-if-a-classpath-resource-exists-before-loading
    private final List<String> fileExtensions =
            Arrays.asList("html", "js", "json", "csv", "css", "png", "svg", "eot", "ttf",
                    "woff", "appcache", "jpg", "jpeg", "gif", "ico");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String path = request.getServletPath();

        boolean isApi = path.startsWith("/api");
        boolean isResourceFile = !isApi && fileExtensions.stream().anyMatch(path::contains);

        if (isApi) {
            chain.doFilter(request, response);
        } else if (isResourceFile) {
            resourceToResponse(path, response);
        } else {
            if (path.equals("/")) {
                resourceToResponse("/index.html", response);
            } else {
                String htmlPath = path + ".html";
                if (staticFileExists(htmlPath)) {
                    resourceToResponse(htmlPath, response);
                } else {
                    String id = path.substring(path.lastIndexOf("/") + 1);
                    String htmlIdPath = path.replace(id, "[id]") + ".html";
                    if (staticFileExists(htmlIdPath)) {
                        resourceToResponse(htmlIdPath, response);
                    } else {
                        resourceToResponse("/404.html", response);
                    }
                }
            }
        }
    }

    private boolean staticFileExists(String resourcePath) {
        return readResource(resourcePath) != null;
    }

    private void resourceToResponse(String resourcePath, HttpServletResponse response) throws IOException {
        InputStream inputStream = readResource(resourcePath);

        if (inputStream == null) {
            response.sendError(NOT_FOUND.value(), NOT_FOUND.getReasonPhrase());
            return;
        }

        //headers
        if (resourcePath.endsWith(".html")) {
            response.setContentType("text/html");
        }
        if (resourcePath.endsWith(".css")) {
            response.setContentType("text/css");
        }
        if (resourcePath.endsWith(".js")) {
            response.setContentType("text/javascript");
        }

        inputStream.transferTo(response.getOutputStream());
    }

    private InputStream readResource(String resourcePath) {
        return Thread.currentThread()
                .getContextClassLoader()
                .getResourceAsStream("static" + resourcePath);
    }
}
