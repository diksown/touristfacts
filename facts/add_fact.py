import os
import json
from pathlib import Path

issue_creator = os.environ['USER']
issue_body = os.environ['BODY']

def add_new_fact(fact, username):
	# improve this location later
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
	fact_list = facts_raw.split()
	id_list = []
	for fact in fact_list:
		if not fact.isspace(): 
			fact_id = add_new_fact(fact, username)
			id_list.append(fact_id)
	return id_list

added_ids = process_facts(issue_body, issue_creator)
print("ADDED_FACTS=\""+str(added_ids)+"\"")