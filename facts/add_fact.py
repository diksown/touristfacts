import os
import json
from pathlib import Path

issue_creator = os.environ['ISSUE_USER']
issue_body = os.environ['ISSUE_BODY']


def add_new_fact(fact, username):
	facts_path = Path(__file__).with_name('facts.json')
	with open(facts_path) as f:
		facts_dict = json.load(f)
	with open(facts_path, 'w') as f:
		facts_dict['facts'].append({
			'content': fact,
			'author': username
		})
		json.dump(facts_dict, f, indent=2)
	return len(facts_dict['facts']) # id of added fact


def process_facts(facts_raw, username):
	facts_raw_processed = facts_raw.replace('\r', '')
	fact_list = facts_raw_processed.split('\n')
	id_list = []
	for fact in fact_list:
		if not fact.isspace() and fact:
			fact_id = add_new_fact(fact, username)
			id_list.append(fact_id)
	return id_list

def pretty_print_ids(id_list):
	to_show = ""
	for fact_id in id_list:
		to_show += "#" + str(fact_id) + ", "
	to_show = to_show[:-2]
	return to_show

added_ids = process_facts(issue_body, issue_creator)
print("ADDED_FACTS="+pretty_print_ids(added_ids))