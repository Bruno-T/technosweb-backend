--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_alliances_id_fk;
ALTER TABLE ONLY public.characters DROP CONSTRAINT characters_users_id_fk;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.characters DROP CONSTRAINT characters_pkey;
ALTER TABLE ONLY public.alliances DROP CONSTRAINT alliances_pkey;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.characters ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.alliances ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.characters_id_seq;
DROP TABLE public.characters;
DROP SEQUENCE public.alliances_id_seq;
DROP TABLE public.alliances;
DROP TYPE public.classes;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: Deluxe
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO "Deluxe";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: Deluxe
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: classes; Type: TYPE; Schema: public; Owner: efrei
--

CREATE TYPE classes AS ENUM (
    'warrior',
    'mage',
    'thief'
);


ALTER TYPE classes OWNER TO efrei;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alliances; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE alliances (
    id integer NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE alliances OWNER TO efrei;

--
-- Name: alliances_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE alliances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE alliances_id_seq OWNER TO efrei;

--
-- Name: alliances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE alliances_id_seq OWNED BY alliances.id;


--
-- Name: characters; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE characters (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    user_id integer NOT NULL,
    class classes DEFAULT 'warrior'::classes NOT NULL,
    "position" point DEFAULT '(0,0)'::point NOT NULL
);


ALTER TABLE characters OWNER TO efrei;

--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE characters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE characters_id_seq OWNER TO efrei;

--
-- Name: characters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE characters_id_seq OWNED BY characters.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: efrei
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(40),
    alliance_id integer
);


ALTER TABLE users OWNER TO efrei;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: efrei
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO efrei;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: efrei
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: alliances id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY alliances ALTER COLUMN id SET DEFAULT nextval('alliances_id_seq'::regclass);


--
-- Name: characters id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters ALTER COLUMN id SET DEFAULT nextval('characters_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: alliances; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY alliances (id, name) FROM stdin;
1	Les gentils
2	Les m‚chants
3	Les Suisses
\.


--
-- Name: alliances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('alliances_id_seq', 1, false);


--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY characters (id, name, user_id, class, "position") FROM stdin;
1	Krom	1	warrior	(0,0)
2	Gandalf	1	mage	(0,0)
3	Gedeon	2	thief	(0,0)
4	Gimli	2	warrior	(0,0)
5	Pippin	2	thief	(0,0)
6	Merry	3	thief	(0,0)
7	Aragorn	4	warrior	(0,0)
8	Boromir	4	warrior	(0,0)
9	Saroumane	5	mage	(0,0)
10	Golum	6	thief	(0,0)
11	Legolas	7	thief	(0,0)
12	Sam	7	thief	(0,0)
13	Faramir	8	warrior	(0,0)
\.


--
-- Name: characters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('characters_id_seq', 13, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: efrei
--

COPY users (id, name, email, alliance_id) FROM stdin;
1	Pierrick	pierrick@test.com	1
2	Ronan	ronan@test.com	1
3	Godefroy	godefroy@test.com	1
4	Bill	bill@test.com	3
5	Notch	notch@test.com	2
6	Fish	fish@test.com	2
7	Meyer	meyer@test.com	2
8	Kojima	kojima@test.com	3
13	babou	babou@email.com	1
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: efrei
--

SELECT pg_catalog.setval('users_id_seq', 13, true);


--
-- Name: alliances alliances_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY alliances
    ADD CONSTRAINT alliances_pkey PRIMARY KEY (id);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: characters characters_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY characters
    ADD CONSTRAINT characters_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_alliances_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: efrei
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_alliances_id_fk FOREIGN KEY (alliance_id) REFERENCES alliances(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

