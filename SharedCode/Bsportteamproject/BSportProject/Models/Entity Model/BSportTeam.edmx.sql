
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 02/25/2017 16:50:45
-- Generated from EDMX file: C:\Users\M\documents\visual studio 2013\Projects\BSportProject\BSportProject\Models\Entity Model\BSportTeam.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [BSportTeamDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[adm].[AppFunction]', 'U') IS NOT NULL
    DROP TABLE [adm].[AppFunction];
GO
IF OBJECT_ID(N'[adm].[Roles]', 'U') IS NOT NULL
    DROP TABLE [adm].[Roles];
GO
IF OBJECT_ID(N'[adm].[Users]', 'U') IS NOT NULL
    DROP TABLE [adm].[Users];
GO
IF OBJECT_ID(N'[Audit].[AuditMonitorTableColumns]', 'U') IS NOT NULL
    DROP TABLE [Audit].[AuditMonitorTableColumns];
GO
IF OBJECT_ID(N'[Audit].[ErrorLog]', 'U') IS NOT NULL
    DROP TABLE [Audit].[ErrorLog];
GO
IF OBJECT_ID(N'[dbo].[Account]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Account];
GO
IF OBJECT_ID(N'[dbo].[Image]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Image];
GO
IF OBJECT_ID(N'[dbo].[PlayerTeam]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PlayerTeam];
GO
IF OBJECT_ID(N'[dbo].[Schedule]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Schedule];
GO
IF OBJECT_ID(N'[dbo].[ScheduleBook]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ScheduleBook];
GO
IF OBJECT_ID(N'[dbo].[TeamSport]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TeamSport];
GO
IF OBJECT_ID(N'[dbo].[Time]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Time];
GO
IF OBJECT_ID(N'[mst].[City]', 'U') IS NOT NULL
    DROP TABLE [mst].[City];
GO
IF OBJECT_ID(N'[mst].[Stadium]', 'U') IS NOT NULL
    DROP TABLE [mst].[Stadium];
GO
IF OBJECT_ID(N'[BSportTeamDBModelStoreContainer].[UserFunction]', 'U') IS NOT NULL
    DROP TABLE [BSportTeamDBModelStoreContainer].[UserFunction];
GO
IF OBJECT_ID(N'[BSportTeamDBModelStoreContainer].[AuditData]', 'U') IS NOT NULL
    DROP TABLE [BSportTeamDBModelStoreContainer].[AuditData];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'AppFunctions'
CREATE TABLE [dbo].[AppFunctions] (
    [FeatureId] int  NOT NULL,
    [FeatureName] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Roles'
CREATE TABLE [dbo].[Roles] (
    [RoleId] int  NOT NULL,
    [RoleName] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [UserId] int  NOT NULL,
    [UserName] varchar(50)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'AuditMonitorTableColumns'
CREATE TABLE [dbo].[AuditMonitorTableColumns] (
    [AuditMonitorTableColumnsID] int IDENTITY(1,1) NOT NULL,
    [SchemaName] nvarchar(250)  NULL,
    [TableName] nvarchar(250)  NULL,
    [ColumnName] nvarchar(250)  NULL
);
GO

-- Creating table 'ErrorLogs'
CREATE TABLE [dbo].[ErrorLogs] (
    [ErrorLogID] int IDENTITY(1,1) NOT NULL,
    [ErrorTime] datetime  NOT NULL,
    [UserName] nvarchar(128)  NOT NULL,
    [ErrorNumber] int  NOT NULL,
    [ErrorSeverity] int  NULL,
    [ErrorState] int  NULL,
    [ErrorProcedure] nvarchar(126)  NULL,
    [ErrorLine] int  NULL,
    [ErrorMessage] nvarchar(4000)  NOT NULL
);
GO

-- Creating table 'Images'
CREATE TABLE [dbo].[Images] (
    [ImageId] bigint  NOT NULL,
    [ImagePath] varchar(max)  NULL
);
GO

-- Creating table 'PlayerTeams'
CREATE TABLE [dbo].[PlayerTeams] (
    [AccountId] int  NULL,
    [TeamId] int  NOT NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL
);
GO

-- Creating table 'Schedules'
CREATE TABLE [dbo].[Schedules] (
    [DateId] int  NOT NULL,
    [DateValue] datetime  NULL
);
GO

-- Creating table 'ScheduleBooks'
CREATE TABLE [dbo].[ScheduleBooks] (
    [ScheduleBookId] int  NOT NULL,
    [DateId] int  NULL,
    [TimeId] int  NULL,
    [Team1] int  NULL,
    [Team2] int  NULL,
    [StadiumId] int  NULL,
    [HostId] int  NULL,
    [Active] bit  NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL
);
GO

-- Creating table 'TeamSports'
CREATE TABLE [dbo].[TeamSports] (
    [TeamId] int  NOT NULL,
    [TeamName] nchar(10)  NULL,
    [ImageId] int  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'Times'
CREATE TABLE [dbo].[Times] (
    [TimeId] int  NOT NULL,
    [time1] time  NULL
);
GO

-- Creating table 'Cities'
CREATE TABLE [dbo].[Cities] (
    [CityId] int  NOT NULL,
    [Name] varchar(50)  NULL,
    [Address] nvarchar(1000)  NULL,
    [Active] bit  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'Stadia'
CREATE TABLE [dbo].[Stadia] (
    [StadiumId] int  NOT NULL,
    [StadiumName] nvarchar(50)  NULL,
    [Address] nvarchar(max)  NULL,
    [Phone] nvarchar(50)  NULL,
    [ImageId] int  NULL,
    [HostId] int  NOT NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL
);
GO

-- Creating table 'UserFunctions'
CREATE TABLE [dbo].[UserFunctions] (
    [UserId] int  NOT NULL,
    [RoleId] int  NULL,
    [FeatureId] int  NULL,
    [Create] bit  NULL,
    [Update] bit  NULL,
    [Delete] bit  NULL,
    [FullControl] bit  NULL,
    [CreateBy] varchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [DeleteFlag] bit  NULL
);
GO

-- Creating table 'AuditDatas'
CREATE TABLE [dbo].[AuditDatas] (
    [AuditDataID] int IDENTITY(1,1) NOT NULL,
    [Type] char(1)  NULL,
    [TableName] varchar(128)  NULL,
    [PrimaryKeyField] varchar(1000)  NULL,
    [PrimaryKeyValue] varchar(1000)  NULL,
    [FieldName] varchar(128)  NULL,
    [OldValue] nvarchar(max)  NULL,
    [NewValue] nvarchar(max)  NULL,
    [UpdateDate] datetime  NULL,
    [UserName] varchar(128)  NULL
);
GO

-- Creating table 'Accounts'
CREATE TABLE [dbo].[Accounts] (
    [AccountId] int IDENTITY(1,1) NOT NULL,
    [AccountName] nvarchar(50)  NULL,
    [Address] nvarchar(1000)  NULL,
    [BirthDay] datetime  NULL,
    [Desc] nvarchar(max)  NULL,
    [ImageId] nvarchar(100)  NULL,
    [PosPlay] nvarchar(50)  NULL,
    [Email] nvarchar(50)  NULL,
    [Password] nvarchar(50)  NULL,
    [ConfirmPassword] nvarchar(50)  NULL,
    [CreateTime] datetime  NULL,
    [CreateBy] varchar(50)  NULL,
    [UpdateTime] datetime  NULL,
    [UpdateBy] varchar(50)  NULL,
    [ConfirmEmail] bit  NULL,
    [isUpdate] bit  NULL,
    [Mobile] nvarchar(50)  NULL,
    [LastName] nvarchar(50)  NULL,
    [FirstName] nvarchar(50)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [FeatureId] in table 'AppFunctions'
ALTER TABLE [dbo].[AppFunctions]
ADD CONSTRAINT [PK_AppFunctions]
    PRIMARY KEY CLUSTERED ([FeatureId] ASC);
GO

-- Creating primary key on [RoleId] in table 'Roles'
ALTER TABLE [dbo].[Roles]
ADD CONSTRAINT [PK_Roles]
    PRIMARY KEY CLUSTERED ([RoleId] ASC);
GO

-- Creating primary key on [UserId] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([UserId] ASC);
GO

-- Creating primary key on [AuditMonitorTableColumnsID] in table 'AuditMonitorTableColumns'
ALTER TABLE [dbo].[AuditMonitorTableColumns]
ADD CONSTRAINT [PK_AuditMonitorTableColumns]
    PRIMARY KEY CLUSTERED ([AuditMonitorTableColumnsID] ASC);
GO

-- Creating primary key on [ErrorLogID] in table 'ErrorLogs'
ALTER TABLE [dbo].[ErrorLogs]
ADD CONSTRAINT [PK_ErrorLogs]
    PRIMARY KEY CLUSTERED ([ErrorLogID] ASC);
GO

-- Creating primary key on [ImageId] in table 'Images'
ALTER TABLE [dbo].[Images]
ADD CONSTRAINT [PK_Images]
    PRIMARY KEY CLUSTERED ([ImageId] ASC);
GO

-- Creating primary key on [TeamId] in table 'PlayerTeams'
ALTER TABLE [dbo].[PlayerTeams]
ADD CONSTRAINT [PK_PlayerTeams]
    PRIMARY KEY CLUSTERED ([TeamId] ASC);
GO

-- Creating primary key on [DateId] in table 'Schedules'
ALTER TABLE [dbo].[Schedules]
ADD CONSTRAINT [PK_Schedules]
    PRIMARY KEY CLUSTERED ([DateId] ASC);
GO

-- Creating primary key on [ScheduleBookId] in table 'ScheduleBooks'
ALTER TABLE [dbo].[ScheduleBooks]
ADD CONSTRAINT [PK_ScheduleBooks]
    PRIMARY KEY CLUSTERED ([ScheduleBookId] ASC);
GO

-- Creating primary key on [TeamId] in table 'TeamSports'
ALTER TABLE [dbo].[TeamSports]
ADD CONSTRAINT [PK_TeamSports]
    PRIMARY KEY CLUSTERED ([TeamId] ASC);
GO

-- Creating primary key on [TimeId] in table 'Times'
ALTER TABLE [dbo].[Times]
ADD CONSTRAINT [PK_Times]
    PRIMARY KEY CLUSTERED ([TimeId] ASC);
GO

-- Creating primary key on [CityId] in table 'Cities'
ALTER TABLE [dbo].[Cities]
ADD CONSTRAINT [PK_Cities]
    PRIMARY KEY CLUSTERED ([CityId] ASC);
GO

-- Creating primary key on [StadiumId] in table 'Stadia'
ALTER TABLE [dbo].[Stadia]
ADD CONSTRAINT [PK_Stadia]
    PRIMARY KEY CLUSTERED ([StadiumId] ASC);
GO

-- Creating primary key on [UserId] in table 'UserFunctions'
ALTER TABLE [dbo].[UserFunctions]
ADD CONSTRAINT [PK_UserFunctions]
    PRIMARY KEY CLUSTERED ([UserId] ASC);
GO

-- Creating primary key on [AuditDataID] in table 'AuditDatas'
ALTER TABLE [dbo].[AuditDatas]
ADD CONSTRAINT [PK_AuditDatas]
    PRIMARY KEY CLUSTERED ([AuditDataID] ASC);
GO

-- Creating primary key on [AccountId] in table 'Accounts'
ALTER TABLE [dbo].[Accounts]
ADD CONSTRAINT [PK_Accounts]
    PRIMARY KEY CLUSTERED ([AccountId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------