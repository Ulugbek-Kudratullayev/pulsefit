from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import User, UserProfile


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    extra = 0


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    list_display = ('email', 'full_name', 'is_active', 'is_staff', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'full_name')
    ordering = ('-date_joined',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ("Shaxsiy ma'lumotlar", {'fields': ('full_name',)}),
        ("Ruxsatlar", {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ("Sanalar", {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )
    inlines = (UserProfileInline,)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'goal', 'weight', 'height', 'bmi')
    list_filter = ('gender', 'goal', 'activity_level', 'language')
    search_fields = ('user__email', 'user__full_name')

    def bmi(self, obj):
        return obj.bmi
    bmi.short_description = 'BMI'
