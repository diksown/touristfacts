import os
import json
from pathlib import Path
from datetime import datetime

issue_creator = os.environ['ISSUE_USER']
issue_body = os.environ['ISSUE_BODY']
time_added = datetime.now().isoformat()

def add_new_fact(fact, username, timestamp):
	facts_path = Path(__file__).with_name('facts.json')
	with open(facts_path) as f:
		facts_dict = json.load(f)
	with open(facts_path, 'w') as f:
		facts_dict['facts'].append({
			'content': fact,
			'author': username,
			'timestamp': timestamp
		})
		json.dump(facts_dict, f, indent=2)
	return len(facts_dict['facts']) - 1 # id of added fact

def parse_fact(fact):
	clean_fact = fact.strip()
	if not clean_fact:
		return None
	if clean_fact[-1] != '.':
		clean_fact += '.'
	return clean_fact

def process_facts(facts_raw, username, timestamp):
	fact_list = facts_raw.split('\n')
	fact_list = [parse_fact(fact) for fact in fact_list if parse_fact(fact)]
	id_list = []
	for fact in fact_list:
		fact_id = add_new_fact(fact, username, timestamp)
		id_list.append(fact_id)
	return id_list

def pretty_print_ids(id_list):
	to_show = ""
	for fact_id in id_list:
		to_show += str(fact_id) + ", "
	to_show = to_show[:-2]
	return to_show

added_ids = process_facts(issue_body, issue_creator, time_added)
print("ADDED_FACTS="+pretty_print_ids(added_ids))
print("FIRST_FACT="+str(added_ids[0]))