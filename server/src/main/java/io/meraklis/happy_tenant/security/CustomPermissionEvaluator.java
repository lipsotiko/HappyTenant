package io.meraklis.happy_tenant.security;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class CustomPermissionEvaluator implements PermissionEvaluator {

    private static final List<String> admins;
    private static final Map<String, List<String>> permissions;

    static {
        admins = new ArrayList<>();
        admins.add("evangelos@meraklis.io");

        permissions = new HashMap<>();
        permissions.put("ADMIN", admins);
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public boolean hasPermission(
            Authentication auth, Object targetDomainObject, Object permission) {
        if ((auth == null) || !(permission instanceof String)) {
            return false;
        }

        switch ((String) permission) {
            case "ADMIN":
                return permissions.get(permission).contains(getEmail(auth));
            case "READ_BY_EMAIL":
                return getEmail(auth).equals(targetDomainObject);
            case "WRITE_BY_ID":
                AbstractAuditor auditor = (AbstractAuditor) targetDomainObject;
                String id = auditor.get_id();
                if (id == null) {
                    return true;
                }
                Query q = new Query();
                q.addCriteria(Criteria.where("_id").is(id));
                AbstractAuditor writeTarget = (AbstractAuditor) mongoTemplate.findOne(q,
                        targetDomainObject.getClass());
                assert writeTarget != null;
                return writeTarget.getCreatedBy().equals(getEmail(auth));
            default:
                return true;
        }
    }

    @Override
    public boolean hasPermission(
            Authentication auth, Serializable targetId, String targetType, Object permission) {
        if ((auth == null) || (targetType == null) || !(permission instanceof String)) {
            return false;
        }

        if ("DELETE_BY_ID".equals(permission)) {
            MongoCollection<Document> collection = mongoTemplate.getCollection(targetType);
            ObjectId objectId = new ObjectId((String) targetId);
            Document document = collection.find(eq("_id", objectId)).first();
            assert document != null;
            return document.get("createdBy").equals(getEmail(auth));
        }
        return permissions.get(permission).contains(getEmail(auth));
    }

    private String getEmail(Authentication auth) {
        String tokenValue = ((JwtAuthenticationToken) auth).getToken().getTokenValue();
        Auth0TokenParser auth0TokenParser = new Auth0TokenParser(tokenValue);
        return auth0TokenParser.decode().getEmail();
    }

}
